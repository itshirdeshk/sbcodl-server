import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetCoursesRequestSchema } from "../../../validation/common/course/GetCourses";

export const GetCourses = async (req: ValidatedRequest<GetCoursesRequestSchema>) => {
    const { courseType, code } = req.body;

    const courses = await prisma.course.findMany({
        where: { courseType: courseType, code: code },
        include: {
            subjects: true
        }
    });

    return courses;
}