import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Pet } from "../models/pet.model.js";
import { addPetSchema } from "../validations/pet.validation.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { deleteLocalFiles } from "../utils/deleteLocalFiles.js";

export const addPet = asyncHandler(async (req, res) => {
  const parsedData = addPetSchema.safeParse(req.body);
  if (!parsedData.success) {
    throw new ApiError(400, "Data missing", parsedData.error.format());
  }

  const petData = parsedData?.data;

  const ownerId = req?.user?._id;
  petData.owner = ownerId;

  let imagesUrl = [];
  if (req?.files && req?.files?.length > 0) {
    try {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file?.path, "pets");

        imagesUrl.push(result.secure_url);
        await deleteLocalFiles(file?.path);
      }
    } catch (error) {
      throw new ApiError(500, "Image upload failed");
    }
  }

  const newPet = await Pet.create({ ...petData, images: imagesUrl });

  return res
    .status(201)
    .json(new ApiResponse(200, newPet, "New pet created successfully!"));
});

export const getAllPets = asyncHandler(async (req, res) => {
  const allPets = await Pet.find();

  if (!allPets) {
    throw new ApiError(404, "No pets found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allPets, "Fetch pets data successfully!"));
});
