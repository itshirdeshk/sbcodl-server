import multer, { Options } from "multer";
import path from "path";

const admissionFileUploadOptions: Options = {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 , // limit file size to 50GB
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
        fileSize: 50 * 1024 * 1024 , // limit file size to 50kb
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

const eventRegistrationFileUploadOptions: Options = {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // limit file size to 10MB
    },
    fileFilter(req, file, callback) {
        var filetypes = /jpeg|jpg|png|pdf/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return callback(null, true);
        }
        callback(new Error("Only JPEG, JPG, PNG, PDF files are allowed"));
    },
};

export const admissionFileUploadHandler = multer(admissionFileUploadOptions);
export const instituteFileUploadHandler = multer(instituteFileUploadOptions);
export const eventRegistrationFileUploadHandler = multer(eventRegistrationFileUploadOptions);
