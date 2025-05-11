import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetSubjectsRequestSchema } from "../../../validation/common/subject/GetSubjects";

export const GetSubjects = async (req: ValidatedRequest<GetSubjectsRequestSchema>) => {
    const { name, courseId, code, type, subjectIds, skip, limit } = req.body;

    let whereClause = {};

    if (subjectIds && subjectIds.length > 0) {
        whereClause = {
            id: { in: subjectIds }
        };
    } else {
        whereClause = {
            ...(name && { name: { contains: name } }),
            ...(courseId && { courseId }),
            ...(code && { code: { contains: code } }),
            ...(type && { type })
        };
    }

    const subjects = await prisma.subject.findMany({
        where: whereClause,
        skip: skip,
        take: limit,
    });

    return subjects;
}
