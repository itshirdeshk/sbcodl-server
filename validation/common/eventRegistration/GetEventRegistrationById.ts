import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetEventRegistrationByIdRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const getEventRegistrationByIdParamsSchema = Joi.object({
    id: Joi.string().required()
});
