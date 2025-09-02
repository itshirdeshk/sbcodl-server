import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import { CreateEventRegistrationRequestSchema } from "../../../validation/common/eventRegistration/CreateEventRegistration";
import sftpService from "../../../services/sftpService";
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
            const templatePath = path.join(__dirname, "../../../emailTemplate/eventRegistration.html");
            
            // Check if template exists, if not create a simple one
            let htmlTemplate = `
                <html>
                    <body>
                        <h2>Event Registration Confirmation</h2>
                        <p>Dear {{firstName}} {{lastName}},</p>
                        <p>Thank you for registering for our event!</p>
                        <p><strong>Registration Details:</strong></p>
                        <ul>
                            <li>Registration Number: {{registrationNumber}}</li>
                            <li>Payment Amount: ₹{{paymentAmount}}</li>
                            {{#if optForFood}}
                            <li>Food Option: Selected</li>
                            {{/if}}
                        </ul>
                        <p>Your registration is currently pending payment. Please complete the payment process to confirm your enrollment.</p>
                        <p>Best regards,<br>SBCODL Team</p>
                    </body>
                </html>
            `;

            if (fs.existsSync(templatePath)) {
                htmlTemplate = fs.readFileSync(templatePath, "utf-8");
            }

            const template = Handlebars.compile(htmlTemplate);
            const htmlContent = template({
                firstName,
                lastName,
                registrationNumber,
                paymentAmount,
                optForFood
            });

            await transporter.sendMail({
                from: process.env.EMAIL_FROM || "noreply@sbcodl.com",
                to: email,
                subject: "Event Registration Confirmation - SBCODL",
                html: htmlContent
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
