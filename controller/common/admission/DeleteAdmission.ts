import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { DeleteAdmissionRequestSchema } from "../../../validation/common/admission/DeleteAdmission";

export const DeleteAdmission = async (
    req: ValidatedRequest<DeleteAdmissionRequestSchema>,

) => {
    const {
        id
    } = req.params;

    await prisma.student.delete({
        where: {
            id: id,
        },
    });

    return { id };
}