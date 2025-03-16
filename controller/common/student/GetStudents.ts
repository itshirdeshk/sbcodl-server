import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetStudentsRequestSchema } from "../../../validation/common/student/GetStudents";

    interface AuthenticatedRequest extends ValidatedRequest<GetStudentsRequestSchema>{
        user: { id: string; }
    }

export const GetStudents = async (req: AuthenticatedRequest) => {
 
   const { id, limit, skip } = req.body;
    
    const students = await prisma.student.findMany({
        where: { id: id },
        include: {
            institute: true,
            permanentAddress: true,
            correspondenceAddress: true,
            educationalQualifications: true,
            lastPassedExam: true,
            results: true,
            documents: true,
            payments: true,
        },
        take: limit,
        skip: skip
    });
    return students;
}