import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetInstitutesBySearchTermRequestSchema } from "../../../validation/common/institute/GetInstitutesBySearchTerm";

export const GetInstitutesBySearchTerm = async (req: ValidatedRequest<GetInstitutesBySearchTermRequestSchema>) => {
    const { searchTerm, limit, skip, paymentStatus } = req.body;

    const institutes = await prisma.institute.findMany({
        where: {
            OR: [
                {
                    headMobileNumber: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    },
                },
                {
                    centerCode: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    },
                },
                {
                    centerName: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    headName: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    centerCity: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    paymentStatus: paymentStatus
                }
            ]
        },
        skip: skip,
        take: limit

    });

    const updatedList = institutes.map((institute) => {
        return {
            id: institute.id,
            centerCode: institute.centerCode,
            centerName: institute.centerName,
            headName: institute.headName,
            headMobileNumber: institute.headMobileNumber,
            centerCity: institute.centerCity,
            centerState: institute.centerState,
            paymentStatus: institute.paymentStatus,
        }
    })

    return updatedList;
}