import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { UpdateSubjectRequestSchema } from "../../../validation/admin/subject/UpdateSubject";

export const UpdateSubject = async (req: ValidatedRequest<UpdateSubjectRequestSchema>) => {
    const { id, ...updatedData } = req.body;

    const subject = await prisma.subject.update(
        {
            where: { id: id },
            data: updatedData
        });

    return subject;
}