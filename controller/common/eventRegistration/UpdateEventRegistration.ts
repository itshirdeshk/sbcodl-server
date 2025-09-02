import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import { UpdateEventRegistrationRequestSchema } from "../../../validation/common/eventRegistration/UpdateEventRegistration";

export const UpdateEventRegistration = async (
    req: ValidatedRequest<UpdateEventRegistrationRequestSchema>
) => {
    const { id } = req.params;
    const updateData = req.body;

    // Check if event registration exists
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

    // Check for duplicate email or phone if they are being updated
    if (updateData.email || updateData.phone) {
        const duplicateCheck = await prisma.eventRegistration.findFirst({
            where: {
                AND: [
                    { id: { not: id } },
                    {
                        OR: [
                            updateData.email ? { email: updateData.email } : {},
                            updateData.phone ? { phone: updateData.phone } : {}
                        ].filter(condition => Object.keys(condition).length > 0)
                    }
                ]
            }
        });

        if (duplicateCheck) {
            throw new Error(
                409,
                GeneralErrorCodes.CLIENT_ERROR,
                "Another registration exists with this email or phone number"
            );
        }
    }

    try {
        // Prepare update data
        const dataToUpdate: any = { ...updateData };
        
        if (updateData.dateOfBirth) {
            dataToUpdate.dateOfBirth = new Date(updateData.dateOfBirth);
        }
        
        if (updateData.preferredStartDate) {
            dataToUpdate.preferredStartDate = new Date(updateData.preferredStartDate);
        }

        // Update event registration
        const updatedRegistration = await prisma.eventRegistration.update({
            where: { id },
            data: dataToUpdate,
            include: {
                documents: true,
                payments: true
            }
        });

        return {
            success: true,
            message: "Event registration updated successfully",
            data: updatedRegistration
        };

    } catch (error) {
        console.error("Event registration update failed:", error);
        throw new Error(
            500,
            GeneralErrorCodes.UNKNOWN,
            "Failed to update event registration"
        );
    }
};
