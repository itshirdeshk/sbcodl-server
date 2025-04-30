import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetStudentsRequestSchema } from "../../../validation/common/student/GetStudents";

export const GetStudents = async (req: ValidatedRequest<GetStudentsRequestSchema>) => {

    const { id, limit, skip, applicationNumber, batch, category, enrollmentNumber, gender, paymentStatus, name, admissionType } = req.body;

    // Build where clause with filters that have values
    const whereClause: any = {};

    if (id) whereClause.id = id;
    if (admissionType) whereClause.admissionType = admissionType;
    if (applicationNumber) whereClause.applicationNumber = applicationNumber;
    if (batch) whereClause.batch = batch;
    if (category) whereClause.category = category;
    if (enrollmentNumber) whereClause.enrollmentNumber = enrollmentNumber;
    if (gender) whereClause.gender = gender;
    if (paymentStatus) whereClause.paymentStatus = paymentStatus;
    if (name) whereClause.name = { contains: name, mode: 'insensitive' };

    const students = await prisma.student.findMany({
        where: whereClause,
        take: limit,
        skip: skip
    });
    return students;
}