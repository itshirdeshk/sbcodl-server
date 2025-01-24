import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { UpdateResultRequestSchema } from "../../../validation/admin/result/UpdateResult";

export const UpdateResult = async (req: ValidatedRequest<UpdateResultRequestSchema>) => {
    const { details, id, ...updatedDetails } = req.body;

    const result = await prisma.result.update({
        where: { id: id },
        data: {
            ...updatedDetails,
            details: details ? {
                updateMany: details.map(detail => ({
                    where: { id: detail.id }, // Update only details with matching IDs
                    data: {
                        code: detail.code,
                        name: detail.name,
                        totalMarks: detail.totalMarks,
                        obtainedMarks: detail.obtainedMarks,
                        grade: detail.grade,
                        status: detail.status
                    }
                }))
            } : undefined
        }
    });

    return result;
}