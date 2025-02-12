import { ValidatedRequest } from "express-joi-validation";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import prisma from "../../../prisma/prismaInstance";
import sftpService from "../../../services/sftpService";
import { generateApplicationNumber } from "../../../utils/generateNumbers";
import { CreateInstituteRequestSchema } from "../../../validation/common/institute/CreateInstitute";

export const CreateInstitute = async (
    req: ValidatedRequest<CreateInstituteRequestSchema>,

) => {
    const {
        ...instituteDetails
    } = req.body;

    if (!req.file || !req.file.buffer) {
        throw new Error(
            404,
            GeneralErrorCodes.FILE_NOT_FOUND,
            R.ERROR_FILE_NOT_FOUND,
        );
    }

    await sftpService.connect();

    const remotePath = `/var/www/documents/institutes/${Date.now()}-${req.file.originalname}`;

    // Upload the image to VPS
    await sftpService.uploadFile(req.file.buffer, remotePath);
    await sftpService.disconnect();

    const imageUrl = `http://${process.env.VPS_HOST}/uploads/institutes/${remotePath.split('/').pop()}`;

    const applicationNumber = generateApplicationNumber();

    const institute = await prisma.institute.create({
        data: {
            applicationNumber: applicationNumber,
            headProfileImage: imageUrl,
            ...instituteDetails,
        }
    });

    return institute;
}