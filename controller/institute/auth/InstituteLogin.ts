import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import jwt from "jsonwebtoken";
import { InstituteLoginRequestSchema } from "../../../validation/institute/InstituteLogin";

export const InstituteLogin = async (req: ValidatedRequest<InstituteLoginRequestSchema>) => {
    const { applicationNumber, registerationNumber, headAadharNumber } = req.body;

    const institute = await prisma.institute.findFirst({
        where: {
            OR: [
                { registrationNumber: registerationNumber || undefined },
                { applicationNumber: applicationNumber || undefined }
            ],
            headAadharNumber: headAadharNumber
        }
    });

    if (!institute) {
        return new Error(
            422,
            GeneralErrorCodes.AUTH_ERROR,
            R.ERROR_INVALID_CREDENTIAL
        );
    }

    // if (applicationNumber && institute.paymentStatus === 'FAILED') {
    //     return new Error(
    //         422,
    //         GeneralErrorCodes.PAYMENT_FAILED,
    //         R.ERROR_PAYMENT_FAILED
    //     );
    // }

    // if (applicationNumber && institute.paymentStatus === 'PENDING') {
    //     return new Error(
    //         422,
    //         GeneralErrorCodes.PAYMENT_PENDING,
    //         R.ERROR_PAYMENT_PENDING
    //     );
    // }

    const accessToken = jwt.sign(
        {
            uid: institute.id,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
        { uid: institute.id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "7d" }
    );

    return {
        accessToken,
        refreshToken,
        institute
    };
}