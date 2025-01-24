import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { CreateNoticeRequestSchema } from "../../../validation/admin/notice/CreateNotice";

export const CreateNotice = async (req: ValidatedRequest<CreateNoticeRequestSchema>) => {
    const { description, title, forInstitute } = req.body;

    const notice = await prisma.notice.create({
        data: {
            description,
            title,            
            forInstitute
        }
    });

    return notice;
}