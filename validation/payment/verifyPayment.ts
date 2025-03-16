import { PaymentType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface VerifyPaymentRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        id: string;
    };
}

export const verifyPaymentSchema = Joi.object({
    id: Joi.string().required(),
})
