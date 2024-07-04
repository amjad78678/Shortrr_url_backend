import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
}

async function upload(filePath: string, folder: string) {
  console.log("in Cloudinary upload", process.env.CLOUDINARY_API_KEY);
  configureCloudinary();

  const result = await cloudinary.uploader.upload(filePath, {
    folder: folder,
  });
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });

  return result;
}

export default upload;
