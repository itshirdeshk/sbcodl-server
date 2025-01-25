import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetResultsRequestSchema } from "../../../validation/common/result/GetResults";

export const GetResults = async (req: ValidatedRequest<GetResultsRequestSchema>) => {
    const { month, status, studentId, year } = req.body;

    const results = await prisma.result.findMany({
        where: { month, status, studentId, year },
        include: {
            details: true
        }
    });

    return results;
}