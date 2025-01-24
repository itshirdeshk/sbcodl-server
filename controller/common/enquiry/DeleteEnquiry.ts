import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { DeleteEnquiryRequestSchema } from "../../../validation/common/enquiry/DeleteEnquiry";
export const DeleteEnquiry = async (req: ValidatedRequest<DeleteEnquiryRequestSchema>) => {
    const { id } = req.params;

    await prisma.enquiry.delete({
        where: { id: id },
    });

    return { id };
}