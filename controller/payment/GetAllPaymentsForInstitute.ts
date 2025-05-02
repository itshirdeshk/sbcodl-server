import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../prisma/prismaInstance";
import { GetAllPaymentsForInstituteRequestSchema } from "../../validation/payment/GetAllPaymentsForInstitute";

export const GetAllPaymentsForInstitute = async (
    req: ValidatedRequest<GetAllPaymentsForInstituteRequestSchema>) => {

    const { type, status, amount, paymentInstrumentType, skip, limit, instituteId } = req.body;


    // Build where clause conditionally based on provided filters
    const whereClause: any = {
        AND: [
            {
                studentId: { not: null },
                student: {
                    instituteId: instituteId
                }
            }
        ]
    };

    if (type) {
        whereClause.paymentType = type;
    }

    if (status) {
        whereClause.paymentStatus = status;
    }

    if (amount !== undefined) {
        whereClause.amount = amount;
    }

    if (paymentInstrumentType) {
        whereClause.paymentInstrumentType = paymentInstrumentType;
    }

    const payments = await prisma.payment.findMany({
        where: whereClause,
        include: {
            student: {
                select: {
                    name: true,
                }
            },
        },
        orderBy: {
            updatedAt: 'desc'
        },
        skip,
        take: limit
    });    
    return payments;
}