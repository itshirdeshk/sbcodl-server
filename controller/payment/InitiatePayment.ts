import { ValidatedRequest } from "express-joi-validation"
import { InitiatePaymentRequestSchema } from "../../validation/payment/InitiatePayment"
import prisma from "../../prisma/prismaInstance";
import { PaymentType } from "@prisma/client";
import crypto from "crypto";
import axios from "axios";
import { Response } from "express";

const PHONEPE_BASE_URL = process.env.PHONEPE_BASE_URL;
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;

export const InitiatePayment = async (
    req: ValidatedRequest<InitiatePaymentRequestSchema>,
    res: Response
) => {
    const {
        name,
        number,
        amount,
        paymentType,
        instituteId,
        studentId,
    } = req.body;

    // Payment initiation logic
    const merchantUserId = paymentType === PaymentType.STUDENT ? `STUDENT-${studentId}` : `INSTITUTE-${instituteId}`;

    const merchantTransactionId = paymentType === PaymentType.STUDENT ? `TXN-S-${crypto.randomBytes(16).toString('hex')}` : `TXN-I-${crypto.randomBytes(16).toString('hex')}`;

    const payload = {
        merchantId: MERCHANT_ID,
        merchantTransactionId: merchantTransactionId,
        amount: amount * 100, // Convert to paise
        redirectUrl: `https://sbiea.co.in/api/api/payment/verify-payment?id=${merchantTransactionId}`,
        // redirectUrl: `http://localhost:8080/api/payment/verify-payment?id=${merchantTransactionId}`,
        redirectMode: "POST",
        name: name,
        mobileNumber: number,
        paymentInstrument: {
            type: "PAY_PAGE"
        }
    };

    const payloadString = JSON.stringify(payload);
    const base64EncodedPayload = Buffer.from(payloadString).toString('base64');
    // Construct the string to hash
    const stringToHash = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;

    // Calculate the SHA256 hash of the string
    const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');

    // Construct the final checksum by appending "###" and the salt index
    const checksum = hash + "###" + SALT_INDEX;

    const PROD_URL = `${PHONEPE_BASE_URL}/pg/v1/pay`;

    const options = {
        method: 'POST',
        url: PROD_URL,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data: {
            request: base64EncodedPayload
        }
    }

    const response = await axios.request(options);

    if (response.data.success) {
        const payment = await prisma.payment.create({
            data: {
                amount: amount,
                merchantUserId: merchantUserId,
                merchantTransactionId: merchantTransactionId,
                merchantId: MERCHANT_ID!,
                paymentType: paymentType,
                instituteId: instituteId,
                studentId: studentId,
            }
        });

        if (paymentType === PaymentType.STUDENT) {
            await prisma.student.update({
                where: {
                    id: studentId,
                },
                data: {
                    payments: {
                        connect: {
                            id: payment.id,
                        }
                    }
                },
            });
        } else if (paymentType === PaymentType.INSTITUTE) {
            await prisma.institute.update({
                where: {
                    id: instituteId,
                },
                data: {
                    payments: {
                        connect: {
                            id: payment.id,
                        }
                    }
                },
            });
        }
    }

    return res.redirect(response.data.data?.instrumentResponse?.redirectInfo?.url ?? null);

    // return {
    //     success: response.data.success,
    //     code: response.data.code,
    //     message: response.data.message,
    //     redirectUrl: response.data.data?.instrumentResponse?.redirectInfo?.url ?? null,
    // };
}