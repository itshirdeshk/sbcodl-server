import { AdmissionType, BatchType, Gender, PaymentStatus, StudentCategory } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetStudentsRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        category: StudentCategory;
        gender: Gender;
        courseId: string;
        batch: BatchType;
        applicationNumber: string;
        enrollmentNumber: string;
        phoneNumber: string;
        email: string;
        instituteId: string;
        paymentStatus: PaymentStatus;
        name: string;
        admissionType: AdmissionType;

        skip: number,
        limit: number,
    };
}

export const getStudentsSchema = Joi.object({
    admissionType: Joi.string().valid(...Object.values(AdmissionType)),
    category: Joi.string().valid(...Object.values(StudentCategory)),
    gender: Joi.string().valid(...Object.values(Gender)),
    courseId: Joi.string(),
    batch: Joi.string().valid(...Object.values(BatchType)),
    applicationNumber: Joi.string(),
    enrollmentNumber: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string().email(),
    instituteId: Joi.string(),
    paymentStatus: Joi.string().valid(...Object.values(PaymentStatus)),
    id: Joi.string(),
    name: Joi.string(),

    skip: Joi.number().required(),
    limit: Joi.number().required(),
})
