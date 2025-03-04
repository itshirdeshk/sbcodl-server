import { Grade, Month, ResultStatus, SubjectResultDetail, Year } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface DeleteResultRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const deleteResultSchema = Joi.object({
    id: Joi.string().required(),
});
