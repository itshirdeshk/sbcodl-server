import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetSubjectByIdRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const getSubjectByIdSchema = Joi.object({
    id: Joi.string().required(),
})
