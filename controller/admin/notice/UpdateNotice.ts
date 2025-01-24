import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { UpdateNoticeRequestSchema } from "../../../validation/admin/notice/UpdateNotice";

export const UpdateNotice = async (req: ValidatedRequest<UpdateNoticeRequestSchema>) => {
    const { id, ...updatedData } = req.body;

    const notice = await prisma.notice.update({
        where: { id: id },
        data: {
            ...updatedData
        }
    });

    return notice;
}