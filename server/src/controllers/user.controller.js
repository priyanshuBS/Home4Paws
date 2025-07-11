import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
  loginUserSchema,
  signupUserSchema,
} from "../validations/user.validation.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token."
    );
  }
};

const accessTokenOptions = {
  httpOnly: true,
  maxAge: 15 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const refreshTokenOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const signpUser = asyncHandler(async (req, res) => {
  const parsed = signupUserSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(400, "Validatin Error", parsed.error.format());
  }

  const { name, email, password, role } = parsed?.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "user with given credentials alredy exist.");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  const userPayload = {
    _id: newUser?._id,
    name: newUser?.name,
    email: newUser?.email,
    role: newUser?.role,
  };

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser?._id
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        200,
        { user: userPayload, accessToken, refreshToken },
        "User created successfull!"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const parsed = loginUserSchema.safeParse(req?.body);

  if (!parsed?.success) {
    throw new ApiError(400, "invlid credentials", parsed?.error?.format());
  }

  const { email, password, role } = parsed?.data;

  const user = await User.findOne({ $and: [{ email }, { role }] });

  if (!user) {
    throw new ApiError(404, "user doesn't exist");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "invlid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user loggedIn successfully!"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: "",
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully!"));
});
