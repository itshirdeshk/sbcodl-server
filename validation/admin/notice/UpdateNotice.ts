import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateNoticeRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string,
        title: string;
        description: string;
        forInstitute: boolean;
    };
}

export const updateNoticeSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    forInstitute: Joi.boolean(),
})
