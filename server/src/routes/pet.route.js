import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addPet, getAllPets } from "../controllers/pet.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/add-pet").post(verifyJWT, upload.array("images", 5), addPet);
router.route("/petsData").get(verifyJWT, getAllPets);

export default router;
