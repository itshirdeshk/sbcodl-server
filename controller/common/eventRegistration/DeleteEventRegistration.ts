import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import prisma from "../../../prisma/prismaInstance";
import { DeleteEventRegistrationRequestSchema } from "../../../validation/common/eventRegistration/DeleteEventRegistration";

export const DeleteEventRegistration = async (
    req: ValidatedRequest<DeleteEventRegistrationRequestSchema>
) => {
    const { id } = req.params;

    // Check if event registration exists
    const existingRegistration = await prisma.eventRegistration.findUnique({
        where: { id },
        include: {
            documents: true,
            payments: true
        }
    });

    if (!existingRegistration) {
        throw new Error(
            404,
            GeneralErrorCodes.CLIENT_ERROR,
            "Event registration not found"
        );
    }

    // Check if there are any successful payments
    const hasSuccessfulPayment = existingRegistration.payments.some(
        payment => payment.paymentStatus === 'SUCCESS'
    );

    if (hasSuccessfulPayment) {
        throw new Error(
            400,
            GeneralErrorCodes.CLIENT_ERROR,
            "Cannot delete registration with successful payments. Please contact admin."
        );
    }

    try {
        // Delete the event registration (cascade will handle related records)
        await prisma.eventRegistration.delete({
            where: { id }
        });

        return {
            success: true,
            message: "Event registration deleted successfully"
        };

    } catch (error) {
        console.error("Delete event registration failed:", error);
        throw new Error(
            500,
            GeneralErrorCodes.UNKNOWN,
            "Failed to delete event registration"
        );
    }
};
