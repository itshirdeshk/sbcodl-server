import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { UpdateEnquiryRequestSchema } from "../../../validation/common/enquiry/UpdateEnquiry";

export const UpdateEnquiry = async (req: ValidatedRequest<UpdateEnquiryRequestSchema>) => {
    const { id, ...updatedData } = req.body;

    const enquiry = await prisma.enquiry.update({
        where: { id: id },
        data: {
            ...updatedData
        }
    });

    return enquiry;
}