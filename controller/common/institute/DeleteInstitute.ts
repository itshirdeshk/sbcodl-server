import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { DeleteInstituteRequestSchema } from "../../../validation/common/institute/DeleteInstitute";

export const DeleteInstitute = async (
    req: ValidatedRequest<DeleteInstituteRequestSchema>,

) => {
    const {
        id
    } = req.params;

    await prisma.institute.delete({
        where: {
            id: id,
        },
    });

    return { id };
}