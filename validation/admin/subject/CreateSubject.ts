import { SubjectType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface CreateSubjectRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string;
        code: string;
        fees: number;
        courseId: string;
        type: SubjectType;
    };
}

export const createSubjectSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    fees: Joi.number(),
    courseId: Joi.string().required(),
    type: Joi.string().valid(SubjectType.LANGUAGE, SubjectType.NON_LANGUAGE, SubjectType.VOCATIONAL).required().messages({ "any.only": `type must be one of ${SubjectType.LANGUAGE}, ${SubjectType.NON_LANGUAGE}, ${SubjectType.VOCATIONAL}` })
})
