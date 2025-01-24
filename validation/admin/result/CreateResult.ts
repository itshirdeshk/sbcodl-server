import { Grade, Month, ResultStatus, SubjectResultDetail, Year } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface CreateResultRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        studentId: string;
        month: Month;
        year: Year;
        totalMarks: number;
        obtainedMarks: number;
        status: ResultStatus;
        details: SubjectResultDetail[];
    };
}

export const createResultSchema = Joi.object({
    studentId: Joi.string().required(),
    month: Joi.string().valid(...Object.values(Month)).required(),
    year: Joi.string().valid(...Object.values(Year)).required(),
    totalMarks: Joi.number().required(),
    obtainedMarks: Joi.number().required(),
    status: Joi.string().valid(...Object.values(ResultStatus)).required(),
    details: Joi.array().items(Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        totalMarks: Joi.number().required(),
        obtainedMarks: Joi.number().required(),
        grade: Joi.string().valid(...Object.values(Grade)).required(),
        status: Joi.string().valid(...Object.values(ResultStatus)).required(),
    })).required(),
});
