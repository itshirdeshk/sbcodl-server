import { PaymentStatus, PaymentType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface AdminPaymentApprovedRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        paymentStatus: PaymentStatus;
        paymentType: PaymentType;
        id: string;
    };
}

export const adminPaymentApprovedSchema = Joi.object({
    paymentStatus: Joi.string().valid(PaymentStatus.SUCCESS).required().messages({ "any.only": `paymentStatus must be ${PaymentStatus.SUCCESS}` }),
    paymentType: Joi.string().valid(PaymentType.INSTITUTE, PaymentType.STUDENT).required().messages({ "any.only": `paymentType must be one of ${PaymentType.INSTITUTE}, ${PaymentType.STUDENT}` }),
    id: Joi.string().required().messages({ "string.empty": `id is required` }),
})
