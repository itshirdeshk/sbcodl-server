import crypto from "crypto";
import prisma from "../../prisma/prismaInstance";
import { ValidatedRequest } from "express-joi-validation";
import { VerifyPaymentRequestSchema } from "../../validation/payment/verifyPayment";
import axios from "axios";
import { Response } from "express";
import path from "path";
import fs from "fs";
import transporter from "../../config/emailConfig";
import Handlebars from "handlebars";
import { generateCenterCode, generateEnrollmentNumber, generateRegistrationNumber } from "../../utils/generateNumbers";

const PHONEPE_BASE_URL = process.env.PHONEPE_BASE_URL;
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;

export const VerifyPayment = async (req: ValidatedRequest<VerifyPaymentRequestSchema>, res: Response) => {
    const merchantTransactionId = req.query.id;

    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + SALT_INDEX;

    const options = {
        method: 'GET',
        url: `${PHONEPE_BASE_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${MERCHANT_ID}`
        }
    }

    const response = await axios.request(options);
    const parsedResponse = response.data;

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

        const sourcePath = path.join(process.cwd(), 'emailTemplate', 'paymentConfirmation.html');
        const source = fs.readFileSync(sourcePath, 'utf8');
        const template = Handlebars.compile(source);

        if (payment.paymentType === 'STUDENT') {
            const enrollmentNumber = generateEnrollmentNumber();
            const response = await prisma.student.update({
                where: {
                    id: payment.studentId!,
                },
                data: {
                    enrollmentNumber: enrollmentNumber,
                    paymentStatus: 'SUCCESS',
                },
            });

            const html = template({ applicationNumber: response.applicationNumber, name: response.name, transactionId: payment.merchantTransactionId, paymentDate: new Date().toLocaleDateString(), amount: payment.amount, paymentMethod: payment.paymentInstrumentType });

            await transporter.sendMail({
                from: `${process.env.EMAIL_USER}@sbiea.co.in`,
                to: response.email,
                subject: "Student Payment Confirmation",
                html: html
            });

            return res.redirect(`https://student.sbiea.co.in/payment?type=${payment.paymentType}&id=${payment.studentId}`);
        } else if (payment.paymentType === 'INSTITUTE') {
            const registrationNumber = generateRegistrationNumber();
            const centerCode = generateCenterCode();

            const response = await prisma.institute.update({
                where: {
                    id: payment.instituteId!,
                },
                data: {
                    registrationNumber: registrationNumber,
                    centerCode: centerCode, 
                    paymentStatus: 'SUCCESS',
                },
            });

            const html = template({ applicationNumber: response.applicationNumber, name: response.centerName, transactionId: payment.merchantTransactionId, paymentDate: new Date().toLocaleDateString(), amount: payment.amount, paymentMethod: payment.paymentInstrumentType });

            await transporter.sendMail({
                from: `${process.env.EMAIL_USER}@sbiea.co.in`,
                to: response.centerEmailId,
                subject: "Institution Payment Confirmation",
                html: html
            });

            return res.redirect(`https://student.sbiea.co.in/payment?type=${payment.paymentType}&id=${payment.instituteId}`);
        }
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
            return res.redirect(`https://student.sbiea.co.in/payment?type=${payment.paymentType}&id=${payment.studentId}`);
        } else if (payment.paymentType === 'INSTITUTE') {
            await prisma.institute.update({
                where: {
                    id: payment.instituteId!,
                },
                data: {
                    paymentStatus: 'PENDING',
                },
            });
            return res.redirect(`https://student.sbiea.co.in/payment?type=${payment.paymentType}&id=${payment.instituteId}`);
        }
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
            return res.redirect(`https://student.sbiea.co.in/payment?type=${payment.paymentType}&id=${payment.studentId}`);
        } else if (payment.paymentType === 'INSTITUTE') {
            await prisma.institute.update({
                where: {
                    id: payment.instituteId!,
                },
                data: {
                    paymentStatus: 'FAILED',
                },
            });
            return res.redirect(`https://student.sbiea.co.in/payment?type=${payment.paymentType}&id=${payment.instituteId}`);
        }
    }
};
