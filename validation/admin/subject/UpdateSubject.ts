import { SubjectType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateSubjectRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        name: string;
        code: string;
        fees: number;
        courseId: string;
        type: SubjectType;
    };
}

export const updateSubjectSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    code: Joi.string(),
    fees: Joi.number(),
    courseId: Joi.string(),
    type: Joi.string().valid(SubjectType.LANGUAGE, SubjectType.NON_LANGUAGE, SubjectType.VOCATIONAL).messages({ "any.only": `type must be one of ${SubjectType.LANGUAGE}, ${SubjectType.NON_LANGUAGE}, ${SubjectType.VOCATIONAL}` })
})
