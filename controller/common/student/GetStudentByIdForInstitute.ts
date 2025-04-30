import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetStudentByIdRequestSchema } from "../../../validation/common/student/GetStudentById";

interface AuthenticatedRequest extends ValidatedRequest<GetStudentByIdRequestSchema> {
    user: { id: string; }
}

export const GetStudentByIdForInstitute = async (req: AuthenticatedRequest) => {
    const { id } = req.params;
    const instituteId = req.user.id;

    const student = await prisma.student.findUnique({
        where: { applicationNumber: id, instituteId: instituteId },
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
    return student;
}