import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GenerateEnrollmentNumberRequestSchema } from "../../../validation/common/admission/GenerateEnrollmentNumber";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import { generateEnrollmentNumber } from "../../../utils/generateNumbers";

export const GenerateEnrollmentNumber = async (
    req: ValidatedRequest<GenerateEnrollmentNumberRequestSchema>,

) => {
    const {
        applicationNumber
    } = req.body;

    const student = await prisma.student.findUnique({
        where: {
            applicationNumber: applicationNumber,
        },
    });

    if (student?.enrollmentNumber) {
        return {
            enrollmentNumber: student.enrollmentNumber
        };
    } else if (student?.paymentStatus === 'FAILED') {
        throw new Error(
            400,
            GeneralErrorCodes.PAYMENT_FAILED,
            R.ERROR_PAYMENT_FAILED,
            'Payment failed. Please pay the fees to generate enrollment number.'
        );
    } else if (student?.paymentStatus === 'PENDING') {
        throw new Error(
            400,
            GeneralErrorCodes.PAYMENT_PENDING,
            R.ERROR_PAYMENT_PENDING,
            'Payment is pending. Please wait for the payment to be processed.'
        );
    } else if (student?.paymentStatus === 'SUCCESS') {
        const enrollmentNumber = generateEnrollmentNumber();
        await prisma.student.update({
            where: {
                applicationNumber: applicationNumber,
            },
            data: {
                enrollmentNumber: enrollmentNumber,
            },
        });

        return {
            enrollmentNumber: enrollmentNumber
        };
    }
}