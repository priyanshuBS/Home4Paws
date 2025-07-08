import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: 3,
      maxLength: 60,
    },
    species: {
      type: String,
      required: [true, "Species is required"],
    },
    breed: {
      type: String,
      trim: true,
      default: "Unknown",
    },
    age: {
      type: Number,
      required: [true, "age is required"],
      min: 0,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
    neutered: {
      type: Boolean,
      default: false,
    },
    adopted: {
      type: Boolean,
      default: false,
    },
    adoptionDate: {
      type: Date,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Pet = mongoose.model("Pet", petSchema);
