import { PaymentInstrumentType, PaymentStatus, PaymentType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetAllPaymentsRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        status: PaymentStatus;
        type: PaymentType;
        amount: number;
        paymentInstrumentType: PaymentInstrumentType;
        skip: number;
        limit: number;
    };
}

export const getAllPaymentsSchema = Joi.object({
    type: Joi.string().valid(...Object.values(PaymentType)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    status: Joi.string().valid(...Object.values(PaymentStatus)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    amount: Joi.number(),
    paymentInstrumentType: Joi.string().valid(...Object.values(PaymentInstrumentType)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    skip: Joi.number().default(0).required(),
    limit: Joi.number().default(10).required(),
})
