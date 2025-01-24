import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GenerateEnrollmentNumberRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        applicationNumber: string;
    };
}

export const generateEnrollmentNumberSchema = Joi.object({
    applicationNumber: Joi.string().required(),
})
