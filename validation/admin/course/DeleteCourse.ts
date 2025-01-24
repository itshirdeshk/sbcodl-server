import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface DeleteCourseRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const deleteCourseSchema = Joi.object({
    id: Joi.string().required(),
})
