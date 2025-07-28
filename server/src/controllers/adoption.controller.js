import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AdoptionRequest } from "../models/adoptionRequest.model.js";
import { Pet } from "../models/pet.model.js";

export const requestAdoption = asyncHandler(async (req, res) => {
  const petId = req?.params?.petId;
  const userId = req?.user?._id;

  const pet = await Pet.findById(petId);
  if (!pet) {
    throw new ApiError(404, "Pet not found.");
  }

  if (pet.adopted) {
    throw new ApiError(400, "Pet is already adopted");
  }

  if (pet.owner.toString() === userId.toString()) {
    throw new ApiError(400, "You cannot adopt your own pet");
  }

  const existingRequest = await AdoptionRequest.findOne({
    pet: petId,
    customer: userId,
  });

  if (existingRequest) {
    throw new ApiError(
      400,
      "You have already requested to adopt this request."
    );
  }

  const adoptionRequest = await AdoptionRequest.create({
    pet: petId,
    customer: userId,
    owner: pet.owner,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, adoptionRequest, "Adoption request submitted"));
});
