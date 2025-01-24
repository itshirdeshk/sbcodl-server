import { CourseType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface CreateCourseRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string;
        code: string;
        fees: number;
        courseType: CourseType;
    };
}

export const createCourseSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string(),
    fees: Joi.number(),
    courseType: Joi.string().valid(...Object.values(CourseType)).required().messages({ "any.only": '{{#label}} must be one of: {{#valids}}' })
})
