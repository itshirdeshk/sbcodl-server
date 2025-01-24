import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { DeleteNoticeRequestSchema } from "../../../validation/admin/notice/DeleteNotice";

export const DeleteNotice = async (req: ValidatedRequest<DeleteNoticeRequestSchema>) => {
    const { id } = req.params;

    const notice = await prisma.notice.delete({
        where: { id: id }
    });

    return notice;
}