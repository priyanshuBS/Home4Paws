import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (filePath, folder) => {
  const transformationMap = {
    profiles: [
      {
        width: 300,
        height: 300,
        crop: "thumb",
        gravity: "face",
        radius: "max",
      },
    ],
    pets: [
      {
        width: 800,
        height: 800,
        crop: "fill",
        gravity: "auto",
      },
    ],
  };

  const transformation = transformationMap[folder] || [];

  return await cloudinary.uploader.upload(filePath, {
    folder,
    transformation,
  });
};
