import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetResultByIdRequestSchema } from "../../../validation/common/result/GetResultById";

export const GetResultById = async (req: ValidatedRequest<GetResultByIdRequestSchema>) => {
    const { id } = req.params;

    const result = await prisma.result.findUnique({
        where: { id: id },
        include: {
            details: true
        }
    });

    return result;
}