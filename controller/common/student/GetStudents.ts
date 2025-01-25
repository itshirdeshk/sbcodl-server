import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetStudentsRequestSchema } from "../../../validation/common/student/GetStudents";

export const GetStudents = async (req: ValidatedRequest<GetStudentsRequestSchema>) => {
    const { admissionType, applicationNumber, batch, category, courseId, email, enrollmentNumber, gender, instituteId, paymentStatus, phoneNumber } = req.body;

    const students = await prisma.student.findUnique({
        where: { admissionType, applicationNumber, batch, category, courseId, email, enrollmentNumber, gender, instituteId, paymentStatus, phoneNumber },
    });

    return students;
}