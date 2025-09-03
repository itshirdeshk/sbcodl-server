import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import prisma from "../../../prisma/prismaInstance";
import sftpService from "../../../services/sftpService";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UploadEventDocumentRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        documentType: string;
    };
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const uploadEventDocumentSchema = Joi.object({
    documentType: Joi.string()
        .valid(
            'PROFILE_PICTURE',
            'PHOTOGRAPH',
            'AADHAR_CARD',
            'PAN_CARD',
            'EDUCATION_CERTIFICATE',
            'EXPERIENCE_LETTER',
            'PASSPORT',
            'OTHER'
        )
        .required()
});

export const uploadEventDocumentParamsSchema = Joi.object({
    id: Joi.string().required()
});

export const UploadEventDocument = async (
    req: ValidatedRequest<UploadEventDocumentRequestSchema>
) => {
    const { id } = req.params;
    const { documentType } = req.body;

    if (!req.file || !req.file.buffer) {
        throw new Error(
            400,
            GeneralErrorCodes.FILE_NOT_FOUND,
            "File is required"
        );
    }

    // Check if event registration exists
    const eventRegistration = await prisma.eventRegistration.findUnique({
        where: { id }
    });

    if (!eventRegistration) {
        throw new Error(
            404,
            GeneralErrorCodes.CLIENT_ERROR,
            "Event registration not found"
        );
    }

    try {
        await sftpService.connect();

        const remotePath = `/var/sbcodl/documents/event-registrations/${Date.now()}-${req.file.originalname}`;
        
        // Upload file to SFTP server
        await sftpService.uploadFile(req.file.buffer, remotePath);

        await sftpService.disconnect();

        const imageUrl = `https://${process.env.VPS_HOST_URL}/uploads/event-registrations/${remotePath.split('/').pop()}`;
        
        // Delete existing document of same type if exists
        const existingDocument = await prisma.eventRegistrationDocument.findFirst({
            where: {
                eventRegistrationId: id,
                documentType: documentType as any
            }
        });

        if (existingDocument) {
            await prisma.eventRegistrationDocument.delete({
                where: { id: existingDocument.id }
            });
        }

        // Save document record in database
        const document = await prisma.eventRegistrationDocument.create({
            data: {
                eventRegistrationId: id,
                documentType: documentType as any,
                fileName: req.file.originalname,
                fileUrl: imageUrl
            }
        });

        return {
            success: true,
            message: "Document uploaded successfully",
            data: {
                id: document.id,
                documentType: document.documentType,
                fileName: document.fileName,
                uploadedAt: document.createdAt
            }
        };

    } catch (error) {
        await sftpService.disconnect();
        console.error("Document upload failed:", error);
        throw new Error(
            500,
            GeneralErrorCodes.UNKNOWN,
            "Failed to upload document"
        );
    }
};
