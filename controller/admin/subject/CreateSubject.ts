import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { CreateSubjectRequestSchema } from "../../../validation/admin/subject/CreateSubject";

export const CreateSubject = async (req: ValidatedRequest<CreateSubjectRequestSchema>) => {
    const { ...subjectDetails } = req.body;

    const subject = await prisma.subject.create({
        data: {
            ...subjectDetails
        }
    });

    return subject;
}