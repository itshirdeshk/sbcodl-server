import { PaymentStatus } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetInstitutesRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        applicationNumber: string;
        registrationNumber: string;
        headAadharNumber: string;
        headPanCardNumber: string;
        headMobileNumber: string;
        headEmailId: string;
        centerCode: string;
        payementStatus: PaymentStatus;

        limit: number;
        skip: number;
    };
}

export const getInstitutesSchema = Joi.object({
    applicationNumber: Joi.string(),
    registrationNumber: Joi.string(),
    headAadharNumber: Joi.string(),
    headPanCardNumber: Joi.string(),
    headMobileNumber: Joi.string(),
    headEmailId: Joi.string(),
    centerCode: Joi.string(),
    payementStatus: Joi.string().valid(...Object.values(PaymentStatus)),

    limit: Joi.number().required(),
    skip: Joi.number().required(),
})
