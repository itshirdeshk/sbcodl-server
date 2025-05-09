import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetSubjectsRequestSchema } from "../../../validation/common/subject/GetSubjects";

export const GetSubjects = async (req: ValidatedRequest<GetSubjectsRequestSchema>) => {
    const { courseId, code, type, subjectIds } = req.body;

    const subjects = await prisma.subject.findMany({
        where: { courseId: courseId, code: code, type: type, id: { in: subjectIds } },
    });

    return subjects;
}
