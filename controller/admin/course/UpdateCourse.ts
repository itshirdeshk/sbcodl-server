import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { UpdateCourseRequestSchema } from "../../../validation/admin/course/UpdateCourse";

export const UpdateCourse = async (req: ValidatedRequest<UpdateCourseRequestSchema>) => {
    const { id, ...updatedData } = req.body;

    const course = await prisma.course.update(
        {
            where: { id: id },
            data: updatedData
        });

    return course;
}