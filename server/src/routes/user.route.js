import express from "express";
import {
  signpUser,
  loginUser,
  logoutUser,
  updateUserDetails,
  aboutMe,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/signup").post(signpUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/update-profile")
  .post(verifyJWT, upload.single("avatar"), updateUserDetails);

router.route("/about-me").get(verifyJWT, aboutMe);

export default router;
