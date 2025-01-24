import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GenerateInstituteRegistrationNumberRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        applicationNumber: string;
    };
}

export const generateInstituteRegistrationNumberSchema = Joi.object({
    applicationNumber: Joi.string().required(),
})
