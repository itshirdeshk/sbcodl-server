import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetStudentByIdRequestSchema } from "../../../validation/common/student/GetStudentById";


export const GetStudentByIdForStudent = async (req: ValidatedRequest<GetStudentByIdRequestSchema> ) => {
    const { id } = req.params;
    console.log(id);
    const student = await prisma.student.findUnique({
        where: { id: id },
        include: {
            correspondenceAddress: true,
            permanentAddress: true,
            results: {
                include: {
                    details: true
                },
            },
            educationalQualifications: true,
            documents: true,
            lastPassedExam: true,
        },
    });
    console.log(student);
    return student;
}