import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetNoticesRequestSchema } from "../../../validation/common/notice/GetNotices";

export const GetNotices = async (req: ValidatedRequest<GetNoticesRequestSchema>) => {
    const { forInstitute } = req.body;

    const notices = await prisma.notice.findMany({
        where: { forInstitute: forInstitute }
    });

    return notices;
}