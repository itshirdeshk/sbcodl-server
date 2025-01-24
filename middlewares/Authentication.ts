import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Error } from "../error/Error";
import { GeneralErrorCodes } from "../constants/ErrorCodes";
import { R } from "../constants/Resource";
import prisma from "../prisma/prismaInstance";

interface AuthenticatedRequest extends Request {
    user?: any
}

export const allowOnlyAdmin = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            const token = req.headers.authorization.split(" ")[1];
            if (!token)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );

            const decoded = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            );
            if (!decoded)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );

            const admin = await prisma.admin.findUnique({
                where: { id: (decoded as JwtPayload).uid as string }, omit: { password: true }
            });
            if (!admin)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );
            else {
                req.user = admin;
                next();
            }
        } else {
            return next(
                new Error(
                    401,
                    GeneralErrorCodes.AUTH_ERROR,
                    R.ERROR_UNAUTHORIZED
                )
            );
        }
    } catch (error) {
        next(error);
    }
};

export const allowOnlyInstitute = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            const token = req.headers.authorization.split(" ")[1];
            if (!token)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );

            const decoded = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            );
            if (!decoded)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );

            const institute = await prisma.institute.findUnique({
                where: { id: (decoded as JwtPayload).uid as string },
            });
            if (!institute)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );
            else {
                req.user = institute;
                next();
            }
        } else {
            return next(
                new Error(
                    401,
                    GeneralErrorCodes.AUTH_ERROR,
                    R.ERROR_UNAUTHORIZED
                )
            );
        }
    } catch (error) {
        next(error);
    }
};

export const allowOnlyStudent = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            const token = req.headers.authorization.split(" ")[1];
            if (!token)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );

            const decoded = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            );
            if (!decoded)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );

            const student = await prisma.student.findUnique({
                where: { id: (decoded as JwtPayload).uid as string },
            });
            if (!student)
                return next(
                    new Error(
                        401,
                        GeneralErrorCodes.AUTH_ERROR,
                        R.ERROR_UNAUTHORIZED
                    )
                );
            else {
                req.user = student;
                next();
            }
        } else {
            return next(
                new Error(
                    401,
                    GeneralErrorCodes.AUTH_ERROR,
                    R.ERROR_UNAUTHORIZED
                )
            );
        }
    } catch (error) {
        next(error);
    }
};