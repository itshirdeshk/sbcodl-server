import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import prisma from "../../../prisma/prismaInstance";
import { CreateEventRegistrationRequestSchema } from "../../../validation/common/eventRegistration/CreateEventRegistration";
import { generateEventRegistrationNumber } from "../../../utils/generateNumbers";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import transporter from "../../../config/emailConfig";

export const CreateEventRegistration = async (
    req: ValidatedRequest<CreateEventRegistrationRequestSchema>
) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        gender,
        address,
        city,
        state,
        pincode,
        country,
        qualification,
        instituteName,
        occupation,
        organizationName,
        designation,
        guardianName,
        guardianPhone,
        guardianRelation,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelation,
        howDidYouHear,
        specialRequirements,
        previousExperience,
        paymentAmount,
        optForFood
    } = req.body;

    // Check if user already exists with same email or phone
    const existingRegistration = await prisma.eventRegistration.findFirst({
        where: {
            OR: [
                { email },
                { phone }
            ]
        }
    });

    if (existingRegistration) {
        throw new Error(
            409,
            GeneralErrorCodes.CLIENT_ERROR,
            "Registration already exists with this email or phone number"
        );
    }

    // Generate unique registration number
    const registrationNumber = generateEventRegistrationNumber();

    try {
        // Create event registration
        const eventRegistration = await prisma.eventRegistration.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                address,
                city,
                state,
                pincode,
                country: country || "India",
                qualification,
                instituteName,
                occupation,
                organizationName,
                designation,
                guardianName,
                guardianPhone,
                guardianRelation,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactRelation,
                howDidYouHear,
                specialRequirements,
                previousExperience,
                registrationNumber,
                paymentAmount,
                paymentStatus: 'PENDING',
                optForFood: optForFood || false
            }
        });

        // Send confirmation email
        try {
            const sourcePath = path.join(process.cwd(), 'emailTemplate', 'eventRegistration.html');
            const source = fs.readFileSync(sourcePath, 'utf8');
            const template = Handlebars.compile(source);

            const html = template({
                firstName,
                lastName,
                registrationNumber,
                paymentAmount,
                optForFood
            });

            await transporter.sendMail({
                from: `${process.env.EMAIL_USER}@sbiea.co.in`,
                to: email,
                subject: "Event Registration Confirmation - SBCODL",
                html
            });
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            // Don't throw error for email failure
        }

        return {
            success: true,
            message: "Event registration created successfully",
            data: {
                id: eventRegistration.id,
                registrationNumber: eventRegistration.registrationNumber,
                paymentAmount: eventRegistration.paymentAmount,
                paymentStatus: eventRegistration.paymentStatus
            }
        };

    } catch (error) {
        console.error("Event registration creation failed:", error);
        throw new Error(
            500,
            GeneralErrorCodes.UNKNOWN,
            "Failed to create event registration"
        );
    }
};
