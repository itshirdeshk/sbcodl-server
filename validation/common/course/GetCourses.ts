import { CourseType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetCoursesRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string;
        courseType: CourseType;

        skip: number;
        limit: number;
    };
}

export const getCoursesSchema = Joi.object({
    name: Joi.string(),
    courseType: Joi.string().valid(...Object.values(CourseType)),
    skip: Joi.number().default(0).required(),
    limit: Joi.number().default(10).required(),
});
