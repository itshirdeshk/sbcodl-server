import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { DeleteResultRequestSchema } from "../../../validation/admin/result/DeleteResult";

export const DeleteResult = async (req: ValidatedRequest<DeleteResultRequestSchema>) => {
    const { id } = req.params;

    await prisma.result.delete({
        where: { id: id },
    });

    return { id };
}