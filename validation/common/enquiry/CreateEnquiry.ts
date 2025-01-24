import { CourseType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface CreateEnquiryRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        title: string;
        description: string;
        name: string;
        phoneNumber: string;
        email: string;
    };
}

export const createEnquirySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    courseType: Joi.string().valid(...Object.values(CourseType)).required().messages({ "any.only": '{{#label}} must be one of: {{#valids}}' })
})
