import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetNoticeByIdRequestSchema } from "../../../validation/common/notice/GetNoticeById";

export const GetNoticeById = async (req: ValidatedRequest<GetNoticeByIdRequestSchema>) => {
    const { id } = req.params;

    const notice = await prisma.notice.findUnique({
        where: { id: id }
    });

    return notice;
}