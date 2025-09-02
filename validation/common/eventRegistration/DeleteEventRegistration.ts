import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface DeleteEventRegistrationRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const deleteEventRegistrationParamsSchema = Joi.object({
    id: Joi.string().required()
});
