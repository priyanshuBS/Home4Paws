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

export const recentPets = asyncHandler(async (req, res) => {
  const recentPets = await Pet.find().sort({ createdAt: -1 }).limit(8);

  if (!recentPets) {
    throw new ApiError(404, "No pets found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, recentPets, "Fetch recent pets data successfully!")
    );
});

export const likePets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const petId = req.params.petId;

  const pets = await Pet.findById(petId);
  if (!pets) {
    throw new ApiError(404, "No pets found.");
  }

  const alreadyLiked = pets.likedBy.includes(userId);

  if (alreadyLiked) {
    pets.likedBy.pull(userId);
  } else {
    pets.likedBy.push(userId);
  }

  await pets.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { likedBy: pets.likedBy },
        `${alreadyLiked ? "Unliked" : "Liked"}`
      )
    );
});

export const featurePets = asyncHandler(async (req, res) => {
  const likedPets = await Pet.aggregate([
    {
      $addFields: { likeCount: { $size: "$likedBy" } },
    },
    {
      $sort: { likeCount: -1 },
    },
    { $limit: 6 },
  ]);

  if (!likedPets) {
    throw new ApiError(404, "Liked pets not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedPets, "Fetch liked pets data successfully!")
    );
});

export const petInfoById = asyncHandler(async (req, res) => {
  const id = req?.params?.id;
  const pet = await Pet.findById(id);

  if (!pet) {
    throw new ApiError(404, "No pet found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, pet, "Fetch pet data successfully!"));
});

const mainCategories = ["dogs", "cat", "bird", "rabbit"];

export const getPetsByCategory = asyncHandler(async (req, res) => {
  const category = req.query.category?.toLowerCase();

  if (!category) {
    throw new ApiError(400, "Category is required");
  }

  const filter = {};

  if (category === "other") {
    filter.category = { $nin: mainCategories };
  } else {
    filter.category = category;
  }

  const pets = await Pet.find(filter).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, pets, "Fetch pets data by category!"));
});
