import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { DeleteSubjectRequestSchema } from "../../../validation/admin/subject/DeleteSubject";

export const DeleteSubject = async (req: ValidatedRequest<DeleteSubjectRequestSchema>) => {
    const { id } = req.params;

    await prisma.subject.delete(
        {
            where: { id: id }
        });

    return { id };
}