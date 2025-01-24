import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { AdminLoginRequestSchema } from "../../../validation/admin/auth/AdminLogin";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import { Error } from "../../../error/Error";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const AdminLogin = async (req: ValidatedRequest<AdminLoginRequestSchema>) => {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({
        where: {
            email: email
        }
    });

    if (!admin) {
        return new Error(
            422,
            GeneralErrorCodes.AUTH_ERROR,
            R.ERROR_INVALID_CREDENTIAL
        );
    }

    if (
        password &&
        password.length > 1 &&
        !(await bcrypt.compare(password, admin.password))
    )
        return new Error(
            422,
            GeneralErrorCodes.AUTH_ERROR,
            R.ERROR_INVALID_CREDENTIAL
        );

    const accessToken = jwt.sign(
        {
            uid: admin.id,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
        { uid: admin.id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "7d" }
    );

    return {
        accessToken,
        refreshToken,
        admin: (({ password, ...adminObj }) => adminObj)(admin),
    };
}