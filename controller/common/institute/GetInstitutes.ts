import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetInstitutesRequestSchema } from "../../../validation/common/institute/GetInstitutes";

export const GetInstitutes = async (req: ValidatedRequest<GetInstitutesRequestSchema>) => {
    const { applicationNumber, centerCode, registrationNumber, headAadharNumber, headEmailId, headMobileNumber, headPanCardNumber, limit, skip, paymentStatus } = req.body;

    const institutes = await prisma.institute.findMany({
        where: { applicationNumber, centerCode, registrationNumber, headAadharNumber, headEmailId, headMobileNumber, headPanCardNumber, paymentStatus },
        skip: skip,
        take: limit

    });
    return institutes;
}