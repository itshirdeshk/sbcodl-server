import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetCoursesRequestSchema } from "../../../validation/common/course/GetCourses";

export const GetCourses = async (req: ValidatedRequest<GetCoursesRequestSchema>) => {
    const { name, courseType, skip, limit } = req.body;

    const courses = await prisma.course.findMany({
        where: { courseType: courseType, name: { contains: name } },
        include: {
            subjects: true
        },
        skip: skip,
        take: limit,
    });

    return courses;
}