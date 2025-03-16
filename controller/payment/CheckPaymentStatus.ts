import { Request, Response } from "express";
import crypto from "crypto";
import prisma from "../../prisma/prismaInstance";
import { Error } from "../../error/Error";
import { GeneralErrorCodes } from "../../constants/ErrorCodes";
import { R } from "../../constants/Resource";
import axios from "axios";

const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
const PHONEPE_BASE_URL = process.env.PHONEPE_BASE_URL;
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;

// Polling intervals as per PhonePe guidelines (in milliseconds)
const POLLING_INTERVALS = [
    20000, // 20 sec initial check
    ...Array(10).fill(3000),  // Every 3 sec for 30 sec
    ...Array(10).fill(6000),  // Every 6 sec for 60 sec
    ...Array(6).fill(10000),  // Every 10 sec for 60 sec
    ...Array(2).fill(30000),  // Every 30 sec for 60 sec
    ...Array(20).fill(60000), // Every 1 min until timeout (20 mins)
];

export const CheckPaymentStatus = async (req: Request, res: Response) => {
    const { merchantTransactionId } = req.params;
    const payment = await prisma.payment.findUnique({
        where: { merchantTransactionId },
    });

    if (!payment) {
        throw new Error(
            404,
            GeneralErrorCodes.PAYMENT_NOT_FOUND,
            R.ERROR_PAYMENT_NOT_FOUND,
        );
    }

    // If payment already processed, return status
    if (payment.paymentStatus !== 'PENDING') {
        return {
            success: true,
            status: payment.paymentStatus,
            message: "Payment already processed",
        };
    }

    // Construct the checkSum for the status check API request
    const url = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
    const stringToHash = url + SALT_KEY;
    const checkSum = crypto.createHash('sha256').update(stringToHash).digest('hex') + `###${SALT_INDEX}`;

    const checkStatus = async () => {
        const response = await axios.get(`${PHONEPE_BASE_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': checkSum,
                'X-MERCHANT-ID': MERCHANT_ID,
            },
        });
        return response.data;
    };

    for (const interval of POLLING_INTERVALS) {
        const statusResponse = await checkStatus();

        if (statusResponse.code === 'PAYMENT_SUCCESS' || statusResponse.code === 'PAYMENT_FAILED') {
            const paymentStatus = statusResponse.code === 'PAYMENT_SUCCESS' ? 'SUCCESS' : 'FAILED';

            // Update payment status in DB
            const payment = await prisma.payment.update({
                where: { merchantTransactionId },
                data: {
                    paymentStatus,
                    phonePeTransactionId: statusResponse.data?.transactionId || null,
                },
            });

            if (payment.paymentType === 'STUDENT') {
                await prisma.student.update({
                    where: {
                        id: payment.studentId!,
                    },
                    data: {
                        paymentStatus: paymentStatus,
                    },
                });
            } else if (payment.paymentType === 'INSTITUTE') {
                await prisma.institute.update({
                    where: {
                        id: payment.instituteId!,
                    },
                    data: {
                        paymentStatus: paymentStatus,
                    },
                });
            }

            return {
                success: true,
                status: paymentStatus,
                message: `Payment ${paymentStatus.toLowerCase()}`,
            };
        }

        // Wait for the next polling interval
        await new Promise(resolve => setTimeout(resolve, interval));
    }

    // If payment is still pending after retries
    return {
        success: false,
        status: "PENDING",
        message: "Payment is still pending after retries. Please try again later.",
    };
};
