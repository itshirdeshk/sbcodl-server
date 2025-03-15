import { PaymentType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface InitiatePaymentRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string;
        number: string;
        amount: number;
        paymentType: PaymentType;
        studentId: string;
        instituteId: string;
    };
}

export const initiatePaymentSchema = Joi.object({
    name: Joi.string(),
    number: Joi.string(),
    amount: Joi.number().required(),
    paymentType: Joi.string().valid(...Object.values(PaymentType)).required().messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    studentId: Joi.string().when('paymentType', {
        is: PaymentType.STUDENT,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    instituteId: Joi.string().when('paymentType', {
        is: PaymentType.INSTITUTE,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
})
