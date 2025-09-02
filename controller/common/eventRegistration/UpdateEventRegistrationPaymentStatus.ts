import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import { UpdateEventRegistrationPaymentStatusRequestSchema } from "../../../validation/common/eventRegistration/UpdateEventRegistrationPaymentStatus";

export const UpdateEventRegistrationPaymentStatus = async (
    req: ValidatedRequest<UpdateEventRegistrationPaymentStatusRequestSchema>
) => {
    const { id, paymentStatus } = req.body;

    try {
        // Check if registration exists
        const existingRegistration = await prisma.eventRegistration.findUnique({
            where: { id }
        });

        if (!existingRegistration) {
            throw new Error(
                404,
                GeneralErrorCodes.CLIENT_ERROR,
                "Event registration not found"
            );
        }

        // Only allow updating from PENDING to SUCCESS
        if (existingRegistration.paymentStatus !== 'PENDING') {
            throw new Error(
                400,
                GeneralErrorCodes.CLIENT_ERROR,
                "Can only update payment status from PENDING to SUCCESS"
            );
        }

        if (paymentStatus !== 'SUCCESS') {
            throw new Error(
                400,
                GeneralErrorCodes.CLIENT_ERROR,
                "Can only update payment status to SUCCESS"
            );
        }

        // Update the payment status
        const updatedRegistration = await prisma.eventRegistration.update({
            where: { id },
            data: { 
                paymentStatus: paymentStatus,
                updatedAt: new Date()
            }
        });

        return {
            success: true,
            message: "Payment status updated successfully",
            data: updatedRegistration
        };

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        console.error("Update event registration payment status failed:", error);
        throw new Error(
            500,
            GeneralErrorCodes.UNKNOWN,
            "Failed to update payment status"
        );
    }
};
