import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import { GetEventRegistrationByIdRequestSchema } from "../../../validation/common/eventRegistration/GetEventRegistrationById";

export const GetEventRegistrationById = async (
    req: ValidatedRequest<GetEventRegistrationByIdRequestSchema>
) => {
    const { id } = req.params;

    try {
        const eventRegistration = await prisma.eventRegistration.findUnique({
            where: { id },
            include: {
                documents: {
                    select: {
                        id: true,
                        documentType: true,
                        fileName: true,
                        fileUrl: true,
                        createdAt: true
                    }
                },
                payments: {
                    select: {
                        id: true,
                        merchantTransactionId: true,
                        amount: true,
                        paymentStatus: true,
                        paymentInstrumentType: true,
                        createdAt: true
                    }
                }
            }
        });

        if (!eventRegistration) {
            throw new Error(
                404,
                GeneralErrorCodes.CLIENT_ERROR,
                "Event registration not found"
            );
        }

        return {
            success: true,
            message: "Event registration retrieved successfully",
            data: eventRegistration
        };

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        console.error("Get event registration failed:", error);
        throw new Error(
            500,
            GeneralErrorCodes.UNKNOWN,
            "Failed to retrieve event registration"
        );
    }
};
