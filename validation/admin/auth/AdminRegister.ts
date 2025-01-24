import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface AdminRegisterRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string;
        email: string;
        password: string;
        adminSecretKey: string;
    };
}

export const adminRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    adminSecretKey: Joi.string().required(),
})
