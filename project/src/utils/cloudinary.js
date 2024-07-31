import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//we have already taken the file from the user and uploaded it onto our server (temporarly)
// now upload the file from localpath to the cloudinary
// and remove the file from our server.

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

//

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    //upload the file on cloudinary

    const uploadImageResponse = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: auto,
      }
    );

    //file loaded successfully.
    console.log("file is uploaded on cloudinary ", uploadImageResponse.url);
    return uploadImageResponse;
  } catch (error) {
    console.error("Their is an error !!", error);
    fs.unlinkSync(localFilePath, () => {
      // remove the locally saved temp file as the upload operation got failed
      console.log("File deleted successfully");
    });
    return null;
  }
};

export { uploadOnCloudinary };
