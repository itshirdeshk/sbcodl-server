import { Request, Response } from "express";
import crypto from "crypto";
import prisma from "../../prisma/prismaInstance";
import { Error } from "../../error/Error";
import { GeneralErrorCodes } from "../../constants/ErrorCodes";
import { R } from "../../constants/Resource";

const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;

export const VerifyPayment = async (req: Request, res: Response) => {
    const { response } = req.body;

    console.log(req.headers);
    console.log(req.headers['x-verify']);
    

    // Decode the base64 response
    const decodedResponse = Buffer.from(response, 'base64').toString('utf-8');
    const parsedResponse = JSON.parse(decodedResponse);

    // Construct the string to hash for verification
    const stringToHash = response + SALT_KEY;
    const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const expectedChecksum = hash + "###" + SALT_INDEX;

    console.log(expectedChecksum);
    

    if (req.headers['x-verify'] !== expectedChecksum) {
        throw new Error(
            403,
            GeneralErrorCodes.UNAUTHORIZED,
            R.ERROR_INVALID_CREDENTIAL
        )
    }

    if (parsedResponse.code === 'PAYMENT_SUCCESS') {
        const payment = await prisma.payment.update({
            where: { merchantTransactionId: parsedResponse.data.merchantTransactionId },
            data: {
                paymentStatus: 'SUCCESS',
                phonePeTransactionId: parsedResponse.data.transactionId,
                paymentInstrumentType: parsedResponse.data.paymentInstrument.type,
                utr: parsedResponse.data.paymentInstrument.utr,
                cardType: parsedResponse.data.paymentInstrument.cardType,
                pgTransactionId: parsedResponse.data.paymentInstrument.pgTransactionId,
                bankTransactionId: parsedResponse.data.paymentInstrument.bankTransactionId,
                pgAuthorizationCode: parsedResponse.data.paymentInstrument.pgAuthorizationCode,
                arn: parsedResponse.data.paymentInstrument.arn,
                bankId: parsedResponse.data.paymentInstrument.bankId,
                brn: parsedResponse.data.paymentInstrument.brn,
            },
        });

        if (payment.paymentType === 'STUDENT') {
            await prisma.student.update({
                where: {
                    id: payment.studentId!,
                },
                data: {
                    paymentStatus: 'SUCCESS',
                },
            });
        } else if (payment.paymentType === 'INSTITUTE') {
            await prisma.institute.update({
                where: {
                    id: payment.instituteId!,
                },
                data: {
                    paymentStatus: 'SUCCESS',
                },
            });
        }

        return payment;
    } else if (parsedResponse.code === 'PAYMENT_PENDING') {
        const payment = await prisma.payment.update({
            where: { merchantTransactionId: parsedResponse.data.merchantTransactionId },
            data: {
                paymentStatus: 'PENDING',
                phonePeTransactionId: parsedResponse.data?.transactionId ?? null,
                paymentInstrumentType: parsedResponse.data?.paymentInstrument?.type ?? null,
                utr: parsedResponse.data?.paymentInstrument?.utr ?? null,
                cardType: parsedResponse.data?.paymentInstrument?.cardType ?? null,
                pgTransactionId: parsedResponse.data?.paymentInstrument?.pgTransactionId ?? null,
                bankTransactionId: parsedResponse.data?.paymentInstrument?.bankTransactionId ?? null,
                pgAuthorizationCode: parsedResponse.data?.paymentInstrument?.pgAuthorizationCode ?? null,
                arn: parsedResponse.data?.paymentInstrument?.arn ?? null,
                bankId: parsedResponse.data?.paymentInstrument?.bankId ?? null,
                brn: parsedResponse.data?.paymentInstrument?.brn ?? null,
            },
        });

        if (payment.paymentType === 'STUDENT') {
            await prisma.student.update({
                where: {
                    id: payment.studentId!,
                },
                data: {
                    paymentStatus: 'PENDING',
                },
            });
        } else if (payment.paymentType === 'INSTITUTE') {
            await prisma.institute.update({
                where: {
                    id: payment.instituteId!,
                },
                data: {
                    paymentStatus: 'PENDING',
                },
            });
        }

        return payment;
    } else {
        const payment = await prisma.payment.update({
            where: { merchantTransactionId: parsedResponse.data.merchantTransactionId },
            data: {
                paymentStatus: 'FAILED',
                phonePeTransactionId: parsedResponse.data?.transactionId ?? null,
                paymentInstrumentType: parsedResponse.data?.paymentInstrument?.type ?? null,
                utr: parsedResponse.data?.paymentInstrument?.utr ?? null,
                cardType: parsedResponse.data?.paymentInstrument?.cardType ?? null,
                pgTransactionId: parsedResponse.data?.paymentInstrument?.pgTransactionId ?? null,
                bankTransactionId: parsedResponse.data?.paymentInstrument?.bankTransactionId ?? null,
                pgAuthorizationCode: parsedResponse.data?.paymentInstrument?.pgAuthorizationCode ?? null,
                arn: parsedResponse.data?.paymentInstrument?.arn ?? null,
                bankId: parsedResponse.data?.paymentInstrument?.bankId ?? null,
                brn: parsedResponse.data?.paymentInstrument?.brn ?? null,
            },
        });
        if (payment.paymentType === 'STUDENT') {
            await prisma.student.update({
                where: {
                    id: payment.studentId!,
                },
                data: {
                    paymentStatus: 'FAILED',
                },
            });
        } else if (payment.paymentType === 'INSTITUTE') {
            await prisma.institute.update({
                where: {
                    id: payment.instituteId!,
                },
                data: {
                    paymentStatus: 'FAILED',
                },
            });
        }

        return payment;
    }
};
