import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetInstitutesRequestSchema } from "../../../validation/common/institute/GetInstitutes";

export const GetInstitutes = async (req: ValidatedRequest<GetInstitutesRequestSchema>) => {
    const { applicationNumber, centerCode, registrationNumber, headAadharNumber, headEmailId, headMobileNumber, headPanCardNumber, limit, skip } = req.body;

    const institute = await prisma.institute.findMany({
        where: { applicationNumber, centerCode, registrationNumber, headAadharNumber, headEmailId, headMobileNumber, headPanCardNumber },
        include: {
            documents: true,
        },
        skip: skip,
        take: limit

    });
    return institute;
}