import { ChatRoom } from "../models/chatRoom.model.js";
import { Message } from "../models/message.model.js";
import { Pet } from "../models/pet.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * @desc Initiate or return existing chat room
 * @route POST /api/chats/initiate
 * @body { petId, otherUserId }
 */
export const initiateChatRoom = asyncHandler(async (req, res) => {
  const { petId, otherUserId } = req.body;
  const currentUserId = req.user._id;

  if (!petId || !otherUserId) {
    throw new ApiError(400, "Pet ID and other user ID are required");
  }

  const pet = await Pet.findById(petId).populate("owner");
  if (!pet) throw new ApiError(404, "Pet not found");

  const ownerId = pet.owner._id.toString();

  // Ensure roles are set correctly
  const owner = currentUserId.toString() === ownerId ? currentUserId : ownerId;
  const customer =
    currentUserId.toString() === ownerId ? otherUserId : currentUserId;

  let chatRoom = await ChatRoom.findOne({ pet: petId, owner, customer });

  if (!chatRoom) {
    chatRoom = await ChatRoom.create({ pet: petId, owner, customer });
  }

  res.status(200).json({
    success: true,
    chatRoom,
  });
});

/**
 * @desc Get all chat rooms for current user
 * @route GET /api/chats/my
 */
export const getMyChatRooms = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const chatRooms = await ChatRoom.find({
    $or: [{ owner: userId }, { customer: userId }],
  })
    .sort({ updatedAt: -1 })
    .populate("pet", "name images")
    .populate("owner", "name email avatar")
    .populate("customer", "name email avatar");

  res.status(200).json({
    success: true,
    chatRooms,
  });
});

/**
 * @desc Get messages for a chat room
 * @route GET /api/chats/:roomId/messages?page=1&limit=20
 */
export const getChatMessages = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  const chatRoom = await ChatRoom.findById(roomId);
  if (
    !chatRoom ||
    ![chatRoom.owner.toString(), chatRoom.customer.toString()].includes(
      userId.toString()
    )
  ) {
    throw new ApiError(403, "You are not authorized to view this chat");
  }

  const messages = await Message.find({ chatRoom: roomId })
    .sort({ createdAt: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("sender", "name avatar");

  res.status(200).json({
    success: true,
    messages,
  });
});
