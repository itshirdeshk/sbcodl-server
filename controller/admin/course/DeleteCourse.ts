import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { DeleteCourseRequestSchema } from "../../../validation/admin/course/DeleteCourse";

export const DeleteCourse = async (req: ValidatedRequest<DeleteCourseRequestSchema>) => {
    const { id } = req.params;

    await prisma.course.delete(
        {
            where: { id: id }
        });

    return { id };
}