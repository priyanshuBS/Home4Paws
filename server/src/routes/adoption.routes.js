import express from "express";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  ownerAdoptionRequest,
  requestAdoption,
  updateAdoptionRequestStatus,
} from "../controllers/adoption.controller.js";

const router = express.Router();

router.route("/request/:petId").post(verifyJWT, requestAdoption);
router
  .route("/adoption-request")
  .get(verifyJWT, authorizeRoles("owner, admin"), ownerAdoptionRequest);
router
  .route("/adoption-request/:requestId")
  .post(verifyJWT, authorizeRoles("owner, admin"), updateAdoptionRequestStatus);

export default router;
