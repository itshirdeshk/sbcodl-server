import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { GetEnquiresRequestSchema } from "../../../validation/admin/enquiry/GetEnquires";

export const GetEnquiries = async (req: ValidatedRequest<GetEnquiresRequestSchema>) => {
    const { email, phoneNumber, status, title } = req.body;

    const enquiries = await prisma.enquiry.findMany({
        where: { email, phoneNumber, status, title }
    });

    return enquiries;
}