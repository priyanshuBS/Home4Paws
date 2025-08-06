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

export const ownerAdoptionRequest = asyncHandler(async (req, res) => {
  const ownerId = req?.user?._id;

  const requests = await AdoptionRequest.find({
    owner: ownerId,
    status: "pending",
  })
    .populate("pet", "name")
    .populate("customer", "name email");


  return res
    .status(200)
    .json(new ApiResponse(200, requests, "Fetched owner adoption requests"));
});

export const updateAdoptionRequestStatus = asyncHandler(async (req, res) => {
  const ownerId = req.user?._id;
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const request = await AdoptionRequest.findOne({
    _id: requestId,
    owner: ownerId,
  });

  if (!request) {
    throw new ApiError(404, "Request doesn't found.");
  }

  request.status = status;
  await request.save();

  if (status === "accepted") {
    await Pet.findByIdAndUpdate(request?.pet, { adopted: true });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, request, `Request ${status} successfully!`));
});
