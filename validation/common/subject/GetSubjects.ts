import { SubjectType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetSubjectsRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        courseId: string;
        code: string;
        type: SubjectType,
        subjectIds: string[];
    };
}

export const getSubjectsSchema = Joi.object({
    courseId: Joi.string(),
    code: Joi.string(),
    type: Joi.string().valid(...Object.values(SubjectType)),
    subjectIds: Joi.array().items(Joi.string())
});
