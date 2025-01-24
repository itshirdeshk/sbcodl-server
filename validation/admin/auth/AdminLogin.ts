import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface AdminLoginRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        email: string;
        password: string;
    };
}

export const adminLogicSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
