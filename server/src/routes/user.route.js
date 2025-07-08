import express from "express";
import {
  signpUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(signpUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
