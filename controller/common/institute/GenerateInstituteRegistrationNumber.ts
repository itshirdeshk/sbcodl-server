import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import { generateCenterCode, generateRegistrationNumber } from "../../../utils/generateNumbers";
import { GenerateInstituteRegistrationNumberRequestSchema } from "../../../validation/common/institute/GenerateInstituteRegistrationNumber";

export const GenerateInstituteRegistrationNumber = async (
    req: ValidatedRequest<GenerateInstituteRegistrationNumberRequestSchema>,

) => {
    const {
        applicationNumber
    } = req.params;

    const institute = await prisma.institute.findUnique({
        where: {
            applicationNumber: applicationNumber,
        },
    });

    if (institute?.registrationNumber) {
        return {
            registrationNumber: institute.registrationNumber,
            centerCode: institute.centerCode,
        };
    } else if (institute?.paymentStatus === 'FAILED') {
        throw new Error(
            400,
            GeneralErrorCodes.PAYMENT_FAILED,
            R.ERROR_PAYMENT_FAILED,
            'Payment failed. Please pay the fees to generate registeration number.'
        );
    } else if (institute?.paymentStatus === 'PENDING') {
        throw new Error(
            400,
            GeneralErrorCodes.PAYMENT_PENDING,
            R.ERROR_PAYMENT_PENDING,
            'Payment is pending. Please wait for the payment to be processed.'
        );
    } else if (institute?.paymentStatus === 'SUCCESS') {
        const registrationNumber = generateRegistrationNumber();
        const centerCode = generateCenterCode();
        await prisma.institute.update({
            where: {
                applicationNumber: applicationNumber,
            },
            data: {
                centerCode: centerCode,
                registrationNumber: registrationNumber,
            },
        });

        return {
            centerCode: centerCode,
            registrationNumber: registrationNumber
        };
    }
}