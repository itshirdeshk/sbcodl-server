import { ValidatedRequest } from "express-joi-validation"
import { InitiatePaymentRequestSchema } from "../../validation/payment/InitiatePayment"
import prisma from "../../prisma/prismaInstance";
import { PaymentType } from "@prisma/client";
import crypto from "crypto";
import axios from "axios";

const PHONEPE_BASE_URL = process.env.PHONEPE_BASE_URL;
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;

export const InitiatePayment = async (
    req: ValidatedRequest<InitiatePaymentRequestSchema>,
) => {
    const {
        amount,
        redirectUrl,
        callbackUrl,
        paymentType,
        instituteId,
        studentId,
    } = req.body;

    // Payment initiation logic
    const merchantUserId = paymentType === PaymentType.STUDENT ? `STUDENT-${studentId}` : `INSTITUTE-${instituteId}`;

    const merchantTransactionId = `TXN-${crypto.randomBytes(16).toString('hex')}`;

    const payload = {
        merchantId: MERCHANT_ID,
        merchantUserId: merchantUserId,
        merchantTransactionId: merchantTransactionId,
        amount: amount * 100, // Convert to paise
        redirectUrl: redirectUrl,
        callbackUrl: callbackUrl,
        redirectMode: "REDIRECT",
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

    const response = await axios.post(
        `${PHONEPE_BASE_URL}/pg/v1/pay`,
        { request: base64EncodedPayload },
        {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            }
        }
    );

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

    return {
        success: response.data.success,
        code: response.data.code,
        message: response.data.message,
        redirectUrl: response.data.data?.instrumentResponse?.redirectInfo?.url ?? null,
    };
}