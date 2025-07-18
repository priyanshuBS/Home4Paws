import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (filePath, folder) => {
  return await cloudinary.uploader.upload(filePath, {
    folder,
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  });
};
