import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetCourseByIdRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const getCourseByIdSchema = Joi.object({
    id: Joi.string().required(),
})
