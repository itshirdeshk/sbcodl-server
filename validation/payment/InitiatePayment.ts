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
        studentId?: string;
        instituteId?: string;
        eventRegistrationId?: string;
    };
}

export const initiatePaymentSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required(),
    amount: Joi.number().required(),
    paymentType: Joi.string().valid('STUDENT', 'INSTITUTE', 'EVENT_REGISTRATION').required().messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    studentId: Joi.string().when('paymentType', {
        is: 'STUDENT',
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    instituteId: Joi.string().when('paymentType', {
        is: 'INSTITUTE',
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    eventRegistrationId: Joi.string().when('paymentType', {
        is: 'EVENT_REGISTRATION',
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
})
