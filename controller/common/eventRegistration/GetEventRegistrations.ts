import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import { GetEventRegistrationsRequestSchema } from "../../../validation/common/eventRegistration/GetEventRegistrations";

export const GetEventRegistrations = async (
    req: ValidatedRequest<GetEventRegistrationsRequestSchema>
) => {
    const {
        page = 1,
        limit = 10000,
        search,
        paymentStatus,
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = req.query;

    try {
        // Build where clause
        const where: any = {};

        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
                { registrationNumber: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (paymentStatus) {
            where.paymentStatus = paymentStatus;
        }

        // Calculate offset
        const skip = (page - 1) * limit;

        // Get total count
        const total = await prisma.eventRegistration.count({ where });

        // Get event registrations
        const eventRegistrations = await prisma.eventRegistration.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                registrationNumber: true,
                paymentStatus: true,
                paymentAmount: true,
                optForFood: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        documents: true,
                        payments: true
                    }
                }
            }
        });

        return {
            success: true,
            message: "Event registrations retrieved successfully",
            data: {
                registrations: eventRegistrations,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };

    } catch (error) {
        console.error("Get event registrations failed:", error);
        throw new Error(
            500,
            GeneralErrorCodes.UNKNOWN,
            "Failed to retrieve event registrations"
        );
    }
};
