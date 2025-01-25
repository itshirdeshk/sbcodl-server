import { EnquiryStatus } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetEnquiresRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        title: string;
        phoneNumber: string;
        email: string;
        status: EnquiryStatus;
    };
}

export const getEnquiresSchema = Joi.object({
    title: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string().email(),
    status: Joi.string().valid(...Object.values(EnquiryStatus)),
})
