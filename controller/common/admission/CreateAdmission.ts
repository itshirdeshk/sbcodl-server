import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import { CreateAdmissionRequestSchema } from "../../../validation/common/admission/CreateAdmission";
import sftpService from "../../../services/sftpService";
import { generateApplicationNumber } from "../../../utils/generateNumbers";

export const CreateAdmission = async (
    req: ValidatedRequest<CreateAdmissionRequestSchema>,

) => {
    const {
        category,
        dob,
        email,
        fatherName,
        gender,
        motherName,
        nationality,
        name,
        phoneNumber,
        batch,
        subjectIds,
        instituteId,
        courseId,
        permanentAddress,
        correspondenceAddress,
        educationalQualifications,
        lastPassedExam,
        admissionType,
        paymentAmount
    } = req.body;

    if (!req.file || !req.file.buffer) {
        throw new Error(
            404,
            GeneralErrorCodes.FILE_NOT_FOUND,
            R.ERROR_FILE_NOT_FOUND,
        );
    }

    await sftpService.connect();

    const remotePath = `/var/www/documents/students/${Date.now()}-${req.file.originalname}`;

    // Upload the image to VPS
    await sftpService.uploadFile(req.file.buffer, remotePath);
    await sftpService.disconnect();

    const imageUrl = `http://${process.env.VPS_HOST}/uploads/students/${remotePath.split('/').pop()}`;

    const applicationNumber = generateApplicationNumber();

    const student = await prisma.student.create({
        data: {
            applicationNumber,
            name,
            category,
            dob,
            gender,
            fatherName,
            motherName,
            instituteId,
            nationality,
            email,
            phoneNumber,
            batch,
            subjectIds,
            studentPhoto: imageUrl,
            admissionType,
            courseId,
            paymentAmount,
            paymentStatus: 'PENDING',
            permanentAddress: {
                create: permanentAddress,
            },
            correspondenceAddress: {
                create: correspondenceAddress,
            },
            educationalQualifications: {
                createMany: {
                    data: educationalQualifications,
                },
            },
            lastPassedExam: {
                create: lastPassedExam,
            }
        }
    });

    return student;
}