import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { CreateEnquiryRequestSchema } from "../../../validation/common/enquiry/CreateEnquiry";
export const CreateEnquiry = async (req: ValidatedRequest<CreateEnquiryRequestSchema>) => {
    const { ...enquiryDetails } = req.body;

    const enquiry = await prisma.enquiry.create({
        data: {
            ...enquiryDetails
        }
    });

    return enquiry;
}