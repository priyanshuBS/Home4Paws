import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate chat rooms for same pet-owner-customer
chatRoomSchema.index({ pet: 1, owner: 1, customer: 1 }, { unique: true });

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
