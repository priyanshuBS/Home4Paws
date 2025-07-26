// useToggleLike.js
import { useState } from "react";
import { toggleLikePets } from "../services/petService";
import toast from "react-hot-toast";

export const useToggleLike = (initialLikedBy, petId, userId) => {
  const [likedBy, setLikedBy] = useState(
    Array.isArray(initialLikedBy) ? initialLikedBy : []
  );

  const isLiked = likedBy.includes(userId);

  const toggleLike = async () => {
    const prevLikedBy = [...likedBy];

    // Optimistic update
    const updatedLikedBy = isLiked
      ? likedBy.filter((id) => id !== userId)
      : [...likedBy, userId];

    setLikedBy(updatedLikedBy);

    try {
      const { likedBy: newLikedBy } = await toggleLikePets(petId);
      setLikedBy(Array.isArray(newLikedBy) ? newLikedBy : []);
    } catch (err) {
      toast.error("Failed to update like.");
      setLikedBy(prevLikedBy);
    }
  };

  return {
    isLiked,
    toggleLike,
    likeCount: likedBy.length,
  };
};
