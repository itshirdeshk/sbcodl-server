import prisma from "../../prisma/prismaInstance";
import { ValidatedRequest } from "express-joi-validation";
import { Response } from "express";
import { GetPaymentDetailsRequestSchema } from "../../validation/payment/getPaymentDetails";

export const GetPaymentDetails = async (req: ValidatedRequest<GetPaymentDetailsRequestSchema>, res: Response) => {
    const type = req.query.type;
    const id = req.query.id;

    if (type === 'STUDENT') {
        const student = await prisma.student.findUnique({
            where: {
                id: id as string
            },
            include: {
                payments: true
            }
        });

        const payment = student?.payments.pop();
        console.log(payment);

        const response = {
            name: student?.name,
            applicationNumber: student?.applicationNumber,
            paymentAmount: student?.paymentAmount,
            paymentStatus: student?.paymentStatus,
            phonePeTransactionId: payment?.phonePeTransactionId,
            merchantTransactionId: payment?.merchantTransactionId,
            paymentInstrument: payment?.paymentInstrumentType,
            date: payment?.updatedAt,
        }

        if (payment?.paymentInstrumentType === 'UPI') {
            return {
                ...response,
                utr: payment?.utr,
            }
        } else if (payment?.paymentInstrumentType === 'CARD') {
            return {
                ...response,
                cardType: payment?.cardType,
                pgTransationId: payment?.pgTransactionId,
                pgAuthorizationCode: payment?.pgAuthorizationCode,
                arn: payment?.arn,
                brn: payment?.brn,
                bankTransactionId: payment?.bankTransactionId,
                bankId: payment?.bankId,
            }
        } else if (payment?.paymentInstrumentType === 'NETBANKING') {
            return {
                ...response,
                pgTransactionId: payment?.pgTransactionId,
                bankId: payment?.bankId,
            }
        }
    } else if (type === 'INSTITUTE') {
        const institute = await prisma.institute.findUnique({
            where: {
                id: id as string
            },
            include: {
                payments: true
            }
        });

        const payment = institute?.payments.pop();

        const response = {
            name: institute?.centerName,
            applicationNumber: institute?.applicationNumber,
            paymentAmount: 1000,
            paymentStatus: institute?.paymentStatus,
            phonePeTransactionId: payment?.phonePeTransactionId,
            merchantTransactionId: payment?.merchantTransactionId,
            paymentInstrument: payment?.paymentInstrumentType,
            date: payment?.updatedAt,
        };

        if (payment?.paymentInstrumentType === 'UPI') {
            return {
                ...response,
                utr: payment?.utr,
            }
        } else if (payment?.paymentInstrumentType === 'CARD') {
            return {
                ...response,
                cardType: payment?.cardType,
                pgTransationId: payment?.pgTransactionId,
                pgAuthorizationCode: payment?.pgAuthorizationCode,
                arn: payment?.arn,
                brn: payment?.brn,
                bankTransactionId: payment?.bankTransactionId,
                bankId: payment?.bankId,
            }
        } else if (payment?.paymentInstrumentType === 'NETBANKING') {
            return {
                ...response,
                pgTransactionId: payment?.pgTransactionId,
                bankId: payment?.bankId,
            }
        }
    }
};
