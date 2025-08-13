import { api } from "../api/api";

export const toggleLikePets = async (petId) => {
  try {
    const response = await api.post(`pets/${petId}/like`);
    return response?.data?.data;
  } catch (err) {
    throw new Error("Failed to make like api call");
  }
};
