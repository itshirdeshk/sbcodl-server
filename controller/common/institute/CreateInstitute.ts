import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import sftpService from "../../../services/sftpService";
import { generateApplicationNumber } from "../../../utils/generateNumbers";
import { CreateInstituteRequestSchema } from "../../../validation/common/institute/CreateInstitute";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import transporter from "../../../config/emailConfig";

export const CreateInstitute = async (
    req: ValidatedRequest<CreateInstituteRequestSchema>,

) => {
    const {
        centerName,
        headName,
        centerAddress,
        headAddress,
        headFatherName,
        ...instituteDetails
    } = req.body;

    const formattedCenterName = centerName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const formattedHeadName = headName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const formattedHeadFatherName = headFatherName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const formattedCenterAddress = centerAddress.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const formattedHeadAddress = headAddress.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    if (!req.file || !req.file.buffer) {
        throw new Error(
            404,
            GeneralErrorCodes.FILE_NOT_FOUND,
            R.ERROR_FILE_NOT_FOUND,
        );
    }

    await sftpService.connect();

    const remotePath = `/var/sbcodl/documents/institutes/${Date.now()}-${req.file.originalname}`;

    // Upload the image to VPS
    await sftpService.uploadFile(req.file.buffer, remotePath);
    await sftpService.disconnect();

    const imageUrl = `https://${process.env.VPS_HOST_URL}/uploads/institutes/${remotePath.split('/').pop()}`;

    const applicationNumber = generateApplicationNumber();

    const sourcePath = path.join(process.cwd(), 'emailTemplate', 'instituteRegister.html');
    const source = fs.readFileSync(sourcePath, 'utf8');
    const template = Handlebars.compile(source);
    const html = template({ applicationNumber: applicationNumber });

    await transporter.sendMail({
        from: `${process.env.EMAIL_USER}@sbiea.co.in`,
        to: req.body.headEmailId,
        subject: "Institute Registration Successful",
        html: html
    });

    const institute = await prisma.institute.create({
        data: {
            applicationNumber: applicationNumber,
            headProfileImage: imageUrl,
            centerName: formattedCenterName,
            headName: formattedHeadName,
            headFatherName: formattedHeadFatherName,
            centerAddress: formattedCenterAddress,
            headAddress: formattedHeadAddress,
            ...instituteDetails,
        }
    });

    return institute;
}