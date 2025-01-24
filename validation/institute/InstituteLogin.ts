import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface InstituteLoginRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        applicationNumber: string;
        registerationNumber: string;
        headAadharNumber: string;
    };
}

export const instituteLoginSchema = Joi.object({
    applicationNumber: Joi.string(),
    registerationNumber: Joi.string(),
    dob: Joi.string().required(),
}).xor('applicationNumber', 'enrollmentNumber');
