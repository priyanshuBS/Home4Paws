import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
  loginUserSchema,
  signupUserSchema,
  updateUserProfileSchema,
} from "../validations/user.validation.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs/promises";
import jwt from "jsonwebtoken";

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
  sameSite: "none",
};

const refreshTokenOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
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
    sameSite: "none",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully!"));
});

export const updateUserDetails = asyncHandler(async (req, res) => {
  const parsedData = updateUserProfileSchema.safeParse(req.body);

  if (!parsedData.success) {
    throw new ApiError(400, "Invalid data provided.");
  }

  const updatedData = parsedData?.data;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  if (req.file) {
    if (user.avatarPubllicId) {
      await cloudinary.uploader.destroy(user.avatarPubllicId);
    }
    const uploadResult = await cloudinary.uploader.upload(req.file?.path, {
      folder: "profiles",
      transformation: [
        {
          width: 300,
          height: 300,
          crop: "thumb",
          gravity: "face",
          radius: "max",
        },
      ],
    });

    await fs.unlink(req.file?.path);

    user.avatar = uploadResult?.secure_url;
    user.avatarPubllicId = uploadResult?.public_id;
  }

  ["name", "phoneNumber", "location"].forEach((field) => {
    if (updatedData[field] !== undefined) {
      user[field] = updatedData[field];
    }
  });
  await user.save();

  const updatedPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber,
    avatar: user.avatar,
    location: user.location,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPayload, "User data updated successfully!")
    );
});

export const aboutMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req?.user?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User info."));
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshTokenFromCookies = req?.cookies?.refreshToken;

  if (!refreshTokenFromCookies) {
    throw new ApiError(401, "No refresh token found in cookies.");
  }

  try {
    const decodeToken = jwt.verify(
      refreshTokenFromCookies,
      process.env.REFRESH_TOKEN_SECRET
    );

    const existingUser = await User.findById(decodeToken?._id);

    if (
      !existingUser ||
      existingUser?.refreshToken !== refreshTokenFromCookies
    ) {
      throw new ApiError(403, "Refresh token invalid or expired.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existingUser?._id
    );

    const userPayload = {
      _id: existingUser?._id,
      name: existingUser?.name,
      email: existingUser?.email,
      role: existingUser?.role,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .json(
        new ApiResponse(
          200,
          { user: userPayload, accessToken, refreshToken },
          "Access token refresh successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Token expired or invalid");
  }
});
