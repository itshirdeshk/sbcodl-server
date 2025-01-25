import { Month, ResultStatus, Year } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetResultsRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        studentId: string;
        month: Month;
        year: Year;
        status: ResultStatus;
    };
}

export const getResultsSchema = Joi.object({
    studentId: Joi.string(),
    month: Joi.string().valid(...Object.values(Month)),
    year: Joi.string().valid(...Object.values(Year)),
    status: Joi.string().valid(...Object.values(ResultStatus)),
})
