import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface AdminChangePasswordRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        oldPassword: string;
        newPassword: string;
        adminSecretKey: string;
    };
}

export const adminChangePasswordSchema = Joi.object({
    id: Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    adminSecretKey: Joi.string().required(),
})
