import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { generateCenterCode, generateEnrollmentNumber, generateRegistrationNumber } from "../../../utils/generateNumbers";
import { AdminPaymentApprovedRequestSchema } from "../../../validation/admin/payment/AdminPaymentApproved";

export const AdminPaymentApproved = async (req: ValidatedRequest<AdminPaymentApprovedRequestSchema>) => {

    const { paymentStatus, paymentType, id } = req.body;

    if (paymentType === 'STUDENT') {
        const student = await prisma.student.findUnique({
            where: { id }
        });

        const enrollmentNumber = student?.enrollmentNumber || generateEnrollmentNumber();

        const updatedStudent = await prisma.student.update({
            where: {
                id: id
            },
            data: {
                paymentStatus: paymentStatus,
                enrollmentNumber: enrollmentNumber,
            }
        });
        return updatedStudent;
    }
    else {
        const institute = await prisma.institute.findUnique({
            where: { id }
        });

        const registrationNumber = institute?.registrationNumber || generateRegistrationNumber();
        const centerCode = institute?.centerCode || generateCenterCode();

        const updatedInstitute = await prisma.institute.update({
            where: {
                id: id
            },
            data: {
                paymentStatus: paymentStatus,
                registrationNumber: registrationNumber,
                centerCode: centerCode,
            }
        });
        return updatedInstitute;
    }
}