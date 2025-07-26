import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addPet,
  getAllPets,
  recentPets,
  likePets,
} from "../controllers/pet.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/add-pet").post(verifyJWT, upload.array("images", 5), addPet);
router.route("/petsData").get(verifyJWT, getAllPets);
router.route("/recentPets").get(verifyJWT, recentPets);
router.route("/:petId/like").post(verifyJWT, likePets);

export default router;
