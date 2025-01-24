import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import sftpService from "../../../services/sftpService";
import { UpdateAdmissionRequestSchema } from "../../../validation/common/admission/UpdateAdmission";
import { R } from "../../../constants/Resource";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { Error } from "../../../error/Error";

export const UpdateAdmission = async (
    req: ValidatedRequest<UpdateAdmissionRequestSchema>,

) => {
    const {
        id,
        permanentAddress,
        correspondenceAddress,
        educationalQualifications,
        lastPassedExam,
        documentId,
        documentType,
        ...updatedData
    } = req.body;

    if (documentType && req.file === undefined && req.file!.buffer === undefined) {
        throw new Error(
            404,
            GeneralErrorCodes.UNKNOWN,
            R.ERROR_UNKNOWN,
        );
    }

    if (documentId || (documentType && req.file && req.file!.buffer)) {
        await sftpService.connect();

        const remotePath = `/var/www/documents/students/${Date.now()}-${req.file!.originalname}`;

        // Upload the image to VPS
        await sftpService.uploadFile(req.file!.buffer, remotePath);
        await sftpService.disconnect();

        const imageUrl = `http://${process.env.VPS_HOST}/uploads/students/${remotePath.split('/').pop()}`;

        if (documentId) {
            // Update existing document
            const student = await prisma.student.update({
                where: { id: id },
                data: {
                    documents: {
                        update: {
                            where: {
                                id: documentId,
                                documentType: documentType,
                            },
                            data: {
                                fileName: req.file!.originalname,
                                fileUrl: imageUrl,
                            },
                        },
                    },
                },
            });
            return student;
        } else {
            // Create new document
            const student = await prisma.student.update({
                where: { id: id },
                data: {
                    documents: {
                        create: {
                            documentType: documentType,
                            fileName: req.file!.originalname,
                            fileUrl: imageUrl,
                        },
                    },
                },
            });

            return student;
        }
    }

    if (req.file && req.file!.buffer) {
        await sftpService.connect();

        const remotePath = `/var/www/documents/${Date.now()}-${req.file!.originalname}`;

        // Upload the image to VPS
        await sftpService.uploadFile(req.file!.buffer, remotePath);
        await sftpService.disconnect();

        const imageUrl = `http://${process.env.VPS_HOST}/uploads/${remotePath.split('/').pop()}`;

        const student = await prisma.student.update({
            where: {
                id: id,
            },
            data: {
                ...updatedData,
                studentPhoto: imageUrl,
                ...(permanentAddress ? {
                    permanentAddress: {
                        update: {
                            where: { id: permanentAddress.id },
                            data: permanentAddress
                        }
                    }
                } : {}),

                ...(correspondenceAddress ? {
                    correspondenceAddress: {
                        update: {
                            where: { id: correspondenceAddress.id },
                            data: correspondenceAddress
                        }
                    }
                } : {}),

                ...(educationalQualifications?.length ? {
                    educationalQualifications: {
                        deleteMany: {},  // Optional: Remove existing qualifications
                        createMany: {
                            data: educationalQualifications
                        }
                    }
                } : {}),

                ...(lastPassedExam ? {
                    lastPassedExam: {
                        update: {
                            where: { id: lastPassedExam.id },
                            data: lastPassedExam
                        }
                    }
                } : {})
            }
        });

        return student;
    } else {
        const student = await prisma.student.update({
            where: {
                id: id,
            },
            data: {
                ...updatedData,
                ...(permanentAddress ? {
                    permanentAddress: {
                        update: {
                            where: { id: permanentAddress.id },
                            data: permanentAddress
                        }
                    }
                } : {}),

                ...(correspondenceAddress ? {
                    correspondenceAddress: {
                        update: {
                            where: { id: correspondenceAddress.id },
                            data: correspondenceAddress
                        }
                    }
                } : {}),

                ...(educationalQualifications?.length ? {
                    educationalQualifications: {
                        deleteMany: {},  // Optional: Remove existing qualifications
                        createMany: {
                            data: educationalQualifications
                        }
                    }
                } : {}),

                ...(lastPassedExam ? {
                    lastPassedExam: {
                        update: {
                            where: { id: lastPassedExam.id },
                            data: lastPassedExam
                        }
                    }
                } : {})
            }
        });

        return student;
    }
}