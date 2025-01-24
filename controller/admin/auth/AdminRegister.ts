import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import { Error } from "../../../error/Error";
import bcrypt from "bcrypt";
import { AdminRegisterRequestSchema } from "../../../validation/admin/auth/AdminRegister";

export const AdminRegister = async (req: ValidatedRequest<AdminRegisterRequestSchema>) => {
    const { name, email, password, adminSecretKey } = req.body;

    if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
        return new Error(
            422,
            GeneralErrorCodes.AUTH_ERROR,
            R.ERROR_INVALID_ADMIN_SECRET_KEY
        );
    }

    const admin = await prisma.admin.findUnique({
        where: {
            email: email
        }
    });

    if (admin) {
        return new Error(
            422,
            GeneralErrorCodes.AUTH_ERROR,
            R.ERROR_USER_ALREADY_EXIST
        );
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }, omit: {
            password: true
        }
    });


    return newAdmin;
}