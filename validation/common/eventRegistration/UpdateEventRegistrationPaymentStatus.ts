import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateEventRegistrationPaymentStatusRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        paymentStatus: string;
    };
}

export const updateEventRegistrationPaymentStatusSchema = Joi.object({
    id: Joi.string().required(),
    paymentStatus: Joi.string().valid('SUCCESS').required()
});
