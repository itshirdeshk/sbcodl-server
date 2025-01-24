import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface CreateNoticeRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        title: string;
        description: string;
        forInstitute: boolean;
    };
}

export const createNoticeSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    forInstitute: Joi.boolean().required(),
})
