import { CourseType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetCoursesRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        courseType: CourseType;
        code: string;
    };
}

export const getCoursesSchema = Joi.object({
    courseType: Joi.string().valid(...Object.values(CourseType)),
    code: Joi.string()
});
