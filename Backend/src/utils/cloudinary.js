console.log("cloudinary.js file loaded!");
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

console.log("Cloudinary Config Values:",
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("response", response);

        // delete resource from local folder
        fs.unlinkSync(localFilePath);
        return response;
        
    } catch (error) {
        console.log("catch part is running")
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return null;
    }
}

export default uploadOnCloudinary;