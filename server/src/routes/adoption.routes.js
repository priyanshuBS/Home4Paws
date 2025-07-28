import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requestAdoption } from "../controllers/adoption.controller.js";

const router = express.Router();

router.route("/request/:petId").post(verifyJWT, requestAdoption);

export default router;
