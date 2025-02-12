import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import sftpService from "../../../services/sftpService";
import { UpdateInstituteRequestSchema } from "../../../validation/common/institute/UpdateInstitute";

export const UpdateInstitute = async (
    req: ValidatedRequest<UpdateInstituteRequestSchema>,

) => {
    const {
        applicationNumber,
        documentType,
        documentId,
        ...instituteDetails
    } = req.body;

    const institute = await prisma.institute.findUnique({
        where: {
            applicationNumber: applicationNumber,
        },
    });

    if (!institute) {
        throw new Error(
            404,
            GeneralErrorCodes.INSTITUTE_NOT_FOUND,
            R.ERROR_INSTITUTE_NOT_FOUND,
        );
    }

    if (documentType && !req.file) {
        throw new Error(
            404,
            GeneralErrorCodes.FILE_NOT_FOUND,
            R.ERROR_FILE_NOT_FOUND,
        );
    }

    if (documentId || (documentType && req.file)) {
        await sftpService.connect();

        const remotePath = `/var/www/documents/institutes/${Date.now()}-${req.file!.originalname}`;

        // Upload the image to VPS
        await sftpService.uploadFile(req.file!.buffer, remotePath);
        await sftpService.disconnect();

        const imageUrl = `http://${process.env.VPS_HOST}/uploads/institutes/${remotePath.split('/').pop()}`;

        if (documentId) {
            await prisma.institute.update({
                where: {
                    applicationNumber: applicationNumber,
                },
                data: {
                    documents: {
                        update: {
                            where: {
                                id: documentId,
                            },
                            data: {
                                fileName: req.file!.originalname,
                                fileUrl: imageUrl,
                            }
                        }
                    }
                }
            });
        } else {
            await prisma.institute.update({
                where: {
                    applicationNumber: applicationNumber,
                },
                data: {
                    documents: {
                        create: {
                            documentType: documentType,
                            fileName: req.file!.originalname,
                            fileUrl: imageUrl,
                        }
                    }
                }
            });
        }
    }

    if (req.file && !documentId && !documentType) {
        await sftpService.connect();

        const remotePath = `/var/www/documents/institutes/${Date.now()}-${req.file.originalname}`;

        // Upload the image to VPS
        await sftpService.uploadFile(req.file.buffer, remotePath);
        await sftpService.disconnect();

        const imageUrl = `http://${process.env.VPS_HOST}/uploads/institutes/${remotePath.split('/').pop()}`;

        const institute = await prisma.institute.update({
            where: {
                applicationNumber: applicationNumber,
            },
            data: {
                headProfileImage: imageUrl,
                ...instituteDetails,
            }
        });

        return institute;
    }

    const updatedInstitute = await prisma.institute.update({
        where: {
            applicationNumber: applicationNumber,
        },
        data: {
            ...instituteDetails,
        }
    });

    return updatedInstitute;
}