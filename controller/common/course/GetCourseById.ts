import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetCourseByIdRequestSchema } from "../../../validation/common/course/GetCourseById";

export const GetCourseById = async (req: ValidatedRequest<GetCourseByIdRequestSchema>) => {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
        where: { id: id },
        include: {
            subjects: true
        }
    });

    return course;
}