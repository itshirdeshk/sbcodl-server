import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { CreateResultRequestSchema } from "../../../validation/admin/result/CreateResult";

export const CreateResult = async (req: ValidatedRequest<CreateResultRequestSchema>) => {
    const { details, month, obtainedMarks, status, studentId, totalMarks, year } = req.body;

    const result = await prisma.result.create({
        data: {
            month, obtainedMarks, status, studentId, totalMarks, year, details: { create: details }
        }
    });

    return result;
}