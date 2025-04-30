import { ValidatedRequest } from "express-joi-validation";
import { GetAllPaymentsRequestSchema } from "../../validation/payment/GetAllPayments";
import prisma from "../../prisma/prismaInstance";

export const GetAllPayments = async (
    req: ValidatedRequest<GetAllPaymentsRequestSchema>) => {

    const { type, status, amount, paymentInstrumentType, skip, limit } = req.body;

    // Build where clause conditionally based on provided filters
    const whereClause: any = {};
    
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
            institute: {
                select: {
                    centerName: true
                }
            },
            student: {
                select: {
                    name: true
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