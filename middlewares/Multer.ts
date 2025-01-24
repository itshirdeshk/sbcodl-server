import multer, { Options } from "multer";
import path from "path";

const admissionFileUploadOptions: Options = {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // limit file size to 50KB
    },
    fileFilter(req, file, callback) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return callback(null, true);
        }
        callback(new Error("Only JPEG, JPG, PNG allowed"));
    },
};

const instituteFileUploadOptions: Options = {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // limit file size to 50KB
    },
    fileFilter(req, file, callback) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return callback(null, true);
        }
        callback(new Error("Only JPEG, JPG, PNG allowed"));
    },
};

export const admissionFileUploadHandler = multer(admissionFileUploadOptions);
export const instituteFileUploadHandler = multer(instituteFileUploadOptions);
