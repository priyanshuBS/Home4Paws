import fs from "fs/promises";

export const deleteLocalFiles = async (paths) => {
  const files = Array.isArray(paths) ? paths : [paths];
  for (const path of files) {
    try {
      await fs.unlink(path);
    } catch (error) {
      throw new Error("Failed to delete files");
    }
  }
};
