import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

// Ensure dotenv is loaded
dotenv.config();

// Support both CLOUDINARY_URL (single variable) or separate variables
if (process.env.CLOUDINARY_URL) {
    // CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
    // When CLOUDINARY_URL is set, cloudinary.config() automatically reads it
    cloudinary.config();
    console.log("Cloudinary configured using CLOUDINARY_URL");
} else if (process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET) {
    // Fallback to separate environment variables
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    console.log("Cloudinary configured using separate variables");
} else {
    console.warn("⚠️  WARNING: Cloudinary credentials not found! File uploads will fail.");
    console.warn("Please set CLOUDINARY_URL or CLOUD_NAME, API_KEY, and API_SECRET in your .env file");
}

export default cloudinary;