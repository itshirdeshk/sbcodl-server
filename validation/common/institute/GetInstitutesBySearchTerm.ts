import { PaymentStatus } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetInstitutesBySearchTermRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        searchTerm: string;
        paymentStatus: PaymentStatus;

        limit: number;
        skip: number;
    };
}

export const getInstitutesBySearchTermSchema = Joi.object({
    searchTerm: Joi.string().required(),
    paymentStatus: Joi.string().valid(...Object.values(PaymentStatus)),
    
    limit: Joi.number().required(),
    skip: Joi.number().required(),
})
