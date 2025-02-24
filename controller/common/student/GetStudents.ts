import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetStudentsRequestSchema } from "../../../validation/common/student/GetStudents";

    interface AuthenticatedRequest extends ValidatedRequest<GetStudentsRequestSchema>{
        user: { id: string; }
    }

export const GetStudents = async (req: AuthenticatedRequest) => {
 
    const instituteId = req.user.id;
    
    const students = await prisma.student.findMany({
        where: { instituteId },
        include: {
            permanentAddress: true,
            correspondenceAddress: true,
            educationalQualifications: true,
            lastPassedExam: true,
            results: true,
            documents: true,
            payments: true,
        },
    });
    return students;
}