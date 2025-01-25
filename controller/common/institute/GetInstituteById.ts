import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetInstituteByIdRequestSchema } from "../../../validation/common/institute/GetInstituteById";

export const GetInstituteById = async (req: ValidatedRequest<GetInstituteByIdRequestSchema>) => {
    const { id } = req.params;

    const institute = await prisma.institute.findUnique({
        where: { id: id },
        include: {
            documents: true,
        }
    });

    return institute;
}