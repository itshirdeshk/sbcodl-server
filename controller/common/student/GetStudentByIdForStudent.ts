import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetStudentByIdRequestSchema } from "../../../validation/common/student/GetStudentById";


export const GetStudentByIdForStudent = async (req: ValidatedRequest<GetStudentByIdRequestSchema> ) => {
    const { id } = req.params;
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
            payments: true,
            educationalQualifications: true,
            documents: true,
            lastPassedExam: true,
        },
    });
    return student;
}