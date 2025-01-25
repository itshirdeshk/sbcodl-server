import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetSubjectByIdRequestSchema } from "../../../validation/common/subject/GetSubjectById";

export const GetSubjectById = async (req: ValidatedRequest<GetSubjectByIdRequestSchema>) => {
    const { id } = req.params;

    const subject = await prisma.subject.findUnique({
        where: { id: id }
    });

    return subject;
}