import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Optional: Utility Functions
export const uploadToCloudinary = async (
    file: Buffer,
    folder: string
) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        // Convert buffer to stream
        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file);
        bufferStream.pipe(uploadStream);
    });
};
