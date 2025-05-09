import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetSubjectsRequestSchema } from "../../../validation/common/subject/GetSubjects";

export const GetSubjects = async (req: ValidatedRequest<GetSubjectsRequestSchema>) => {
    const { courseId, code, type, subjectIds } = req.body;

    let whereClause = {};
    
    if (subjectIds && subjectIds.length > 0) {
        whereClause = {
            id: { in: subjectIds }
        };
    } else {
        whereClause = {
            ...(courseId && { courseId }),
            ...(code && { code }),
            ...(type && { type })
        };
    }

    const subjects = await prisma.subject.findMany({
        where: whereClause
    });

    return subjects;
}
