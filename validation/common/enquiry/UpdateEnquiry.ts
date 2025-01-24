import { CourseType, EnquiryStatus } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateEnquiryRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        title: string;
        description: string;
        name: string;
        phoneNumber: string;
        email: string;
        status: EnquiryStatus;
    };
}

export const updateEnquirySchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    name: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string().email(),
    status: Joi.string().valid(...Object.values(EnquiryStatus)).messages({ "any.only": '{{#label}} must be one of: {{#valids}}' })
})
