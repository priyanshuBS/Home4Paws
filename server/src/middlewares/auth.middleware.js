import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ErrorApiResponse } from "../utils/ErrorApiResponse";
import jwt from "jsonwebtoken";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(new ErrorApiResponse("token not found"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      return res.status(401).json(new ErrorApiResponse("Invalid token"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(new ErrorApiResponse("Invalid credentials"));
  }
});
