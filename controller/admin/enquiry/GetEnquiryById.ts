import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetEnquiryByIdRequestSchema } from "../../../validation/admin/enquiry/GetEnquiryById";

export const GetEnquiryById = async (req: ValidatedRequest<GetEnquiryByIdRequestSchema>) => {
    const { id } = req.params;

    const enquiry = await prisma.enquiry.findUnique({
        where: { id: id }
    });

    return enquiry;
}