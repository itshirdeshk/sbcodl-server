import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import { CreateAdmissionRequestSchema } from "../../../validation/common/admission/CreateAdmission";
import sftpService from "../../../services/sftpService";
import { generateApplicationNumber } from "../../../utils/generateNumbers";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import transporter from "../../../config/emailConfig";

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

    const remotePath = `/var/sbcodl/documents/students/${Date.now()}-${req.file.originalname}`;

    // Upload the image to VPS
    await sftpService.uploadFile(req.file.buffer, remotePath);
    await sftpService.disconnect();

    const imageUrl = `https://${process.env.VPS_HOST_URL}/uploads/students/${remotePath.split('/').pop()}`;

    const applicationNumber = generateApplicationNumber();

    const sourcePath = path.join(process.cwd(), 'emailTemplate', 'studentRegister.html');
    const source = fs.readFileSync(sourcePath, 'utf8');
    const template = Handlebars.compile(source);
    const html = template({ applicationNumber: applicationNumber });

    await transporter.sendMail({
        from: `${process.env.EMAIL_USER}@sbiea.co.in`,
        to: email,
        subject: "Student Registration Successful",
        html: html
    });

    const student = await prisma.student.create({
        data: {
            applicationNumber,
            name: name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
            category,
            dob,
            gender,
            fatherName: fatherName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
            motherName: motherName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
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