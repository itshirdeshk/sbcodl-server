import { Grade, Month, ResultStatus, SubjectResultDetail, Year } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateResultRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        studentId: string;
        month: Month;
        year: Year;
        totalMarks: number;
        obtainedMarks: number;
        status: ResultStatus;
        details: SubjectResultDetail[];
    };
}

export const updateResultSchema = Joi.object({
    id: Joi.string().required(),
    studentId: Joi.string(),
    month: Joi.string().valid(...Object.values(Month)),
    year: Joi.string().valid(...Object.values(Year)),
    totalMarks: Joi.number(),
    obtainedMarks: Joi.number(),
    status: Joi.string().valid(...Object.values(ResultStatus)),
    details: Joi.array().items(Joi.object({
        code: Joi.string(),
        name: Joi.string(),
        totalMarks: Joi.number(),
        obtainedMarks: Joi.number(),
        grade: Joi.string().valid(...Object.values(Grade)),
        status: Joi.string().valid(...Object.values(ResultStatus)),
    })),
});
