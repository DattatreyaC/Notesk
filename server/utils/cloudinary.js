import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (file, id) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: `Notesk/${id}`,
        });

        fs.unlinkSync(file);

        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        fs.unlinkSync(file);
        console.log(error);
    }
};

export default uploadOnCloudinary;
