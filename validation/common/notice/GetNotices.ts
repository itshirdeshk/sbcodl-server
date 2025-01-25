import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetNoticesRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        forInstitute: boolean;
    };
}

export const getNoticesSchema = Joi.object({
    forInstitute: Joi.boolean(),
})
