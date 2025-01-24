import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { CreateCourseRequestSchema } from "../../../validation/admin/course/CreateCourse";

export const CreateCourse = async (req: ValidatedRequest<CreateCourseRequestSchema>) => {
    const { ...courseDetails } = req.body;

    const course = await prisma.course.create({
        data: {
            ...courseDetails
        }
    });

    return course;
}