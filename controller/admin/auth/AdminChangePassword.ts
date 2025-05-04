import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import { Error } from "../../../error/Error";
import bcrypt from "bcrypt";
import { AdminChangePasswordRequestSchema } from "../../../validation/admin/auth/AdminChangePassword";

export const AdminChangePassword = async (req: ValidatedRequest<AdminChangePasswordRequestSchema>) => {
    const { id, oldPassword, newPassword, adminSecretKey } = req.body;

    console.log(oldPassword, newPassword, adminSecretKey);


    if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
        return new Error(
            422,
            GeneralErrorCodes.AUTH_ERROR,
            R.ERROR_INVALID_ADMIN_SECRET_KEY
        );
    }

    // Get the admin from the request
    const admin = await prisma.admin.findUnique({
        where: {
            id: id
        }
    });

    const isPasswordSame = await bcrypt.compare(oldPassword, admin?.password as string);

    if (!isPasswordSame) {
        return new Error(
            422,
            GeneralErrorCodes.AUTH_ERROR,
            R.ERROR_PASSWORD_NOT_MATCH
        );
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const newAdmin = await prisma.admin.update({
        where: { id: id },
        data: {
            password: newHashedPassword
        }, omit: {
            password: true
        }
    });


    return newAdmin;
}