import { PaymentType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetPaymentDetailsRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        type: PaymentType;
        id: string;
    };
}

export const getPaymentDetailsSchema = Joi.object({
    type: Joi.string().valid(...Object.values(PaymentType)).required().messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    id: Joi.string().required()
})
