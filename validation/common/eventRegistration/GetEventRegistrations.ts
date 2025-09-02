import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetEventRegistrationsRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        page?: number;
        limit?: number;
        search?: string;
        paymentStatus?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    };
}

export const getEventRegistrationsSchema = Joi.object({
    page: Joi.number().integer().min(1).optional().default(1),
    limit: Joi.number().integer().min(1).max(100).optional().default(10),
    search: Joi.string().optional(),
    paymentStatus: Joi.string().valid('PENDING', 'SUCCESS', 'FAILED', 'DECLINED', 'PROCESSING', 'REFUNDED', 'CANCELLED', 'TIMED_OUT', 'ERROR').optional(),
    sortBy: Joi.string().valid('createdAt', 'firstName', 'lastName', 'email', 'registrationNumber', 'paymentStatus').optional().default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').optional().default('desc')
});
