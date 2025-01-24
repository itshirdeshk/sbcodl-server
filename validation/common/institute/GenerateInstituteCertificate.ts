import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GenerateInstituteCertificateRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        registrationNumber: string;
    };
}

export const generateInstituteCertificateSchema = Joi.object({
    registrationNumber: Joi.string().required(),
})
