import { CourseType, DurationType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateCourseRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        name: string;
        code: string;
        fees: number;
        duration: number;
        durationType: DurationType;
        courseType: CourseType;
    };
}

export const updateCourseSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    code: Joi.string(),
    fees: Joi.number(),
    duration: Joi.number(),
    durationType: Joi.string().valid(...Object.values(DurationType)).messages({ "any.only": '{{#label}} must be one of: {{#valids}}' }),
    courseType: Joi.string().valid(...Object.values(CourseType)).messages({ "any.only": '{{#label}} must be one of: {{#valids}}' })
})
