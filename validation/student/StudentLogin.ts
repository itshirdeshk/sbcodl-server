import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface StudentLoginRequestSchema
	extends ValidatedRequestSchema {
	[ContainerTypes.Body]: {
		applicationNumber: string;
		enrollmentNumber: string;
		dob: string;
	};
}

export const studentLoginSchema = Joi.object({
	applicationNumber: Joi.string(),
	enrollmentNumber: Joi.string(),
	dob: Joi.string().required(),
}).xor('applicationNumber', 'enrollmentNumber');
