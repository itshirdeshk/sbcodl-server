import { CourseType, EnquiryStatus } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface DeleteEnquiryRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const deleteEnquirySchema = Joi.object({
    id: Joi.string().required()
})
