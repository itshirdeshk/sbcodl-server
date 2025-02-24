import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import jwt from "jsonwebtoken";
import { StudentLoginRequestSchema } from "../../../validation/student/StudentLogin";

export const StudentLogin = async (req: ValidatedRequest<StudentLoginRequestSchema>) => {
    const { applicationNumber, enrollmentNumber, dob } = req.body;

    const student = await prisma.student.findFirst({
        where: {
            OR: [
                { enrollmentNumber: enrollmentNumber || undefined },
                { applicationNumber: applicationNumber || undefined }
            ],
            dob: dob
        }
    });

    if (!student) {
        return new Error(
            422,
            GeneralErrorCodes.AUTH_ERROR,
            R.ERROR_INVALID_CREDENTIAL
        );
    }

    // if(applicationNumber && student.paymentStatus === 'FAILED') {
    //     return new Error(
    //         422,
    //         GeneralErrorCodes.PAYMENT_FAILED,
    //         R.ERROR_PAYMENT_FAILED
    //     );
    // }

    // if(applicationNumber && student.paymentStatus === 'PENDING') {
    //     return new Error(
    //         422,
    //         GeneralErrorCodes.PAYMENT_PENDING,
    //         R.ERROR_PAYMENT_PENDING
    //     );
    // }

    const accessToken = jwt.sign(
        {
            uid: student.id,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
        { uid: student.id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "7d" }
    );

    return {
        accessToken,
        refreshToken,
        student
    };
}