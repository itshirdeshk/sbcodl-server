import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateEventRegistrationRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        dateOfBirth?: Date;
        gender?: string;
        address?: string;
        city?: string;
        state?: string;
        pincode?: string;
        country?: string;
        qualification?: string;
        instituteName?: string;
        passingYear?: string;
        percentage?: string;
        occupation?: string;
        workExperience?: string;
        organizationName?: string;
        designation?: string;
        selectedProgram?: string;
        programMode?: string;
        preferredStartDate?: Date;
        guardianName?: string;
        guardianPhone?: string;
        guardianRelation?: string;
        emergencyContactName?: string;
        emergencyContactPhone?: string;
        emergencyContactRelation?: string;
        howDidYouHear?: string;
        specialRequirements?: string;
        previousExperience?: string;
    };
    [ContainerTypes.Params]: {
        id: string;
    };
}

export const updateEventRegistrationSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).optional(),
    dateOfBirth: Joi.date().max('now').optional(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').optional(),
    address: Joi.string().min(10).max(200).optional(),
    city: Joi.string().min(2).max(50).optional(),
    state: Joi.string().min(2).max(50).optional(),
    pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).optional(),
    country: Joi.string().min(2).max(50).optional(),
    qualification: Joi.string().min(2).max(100).optional(),
    instituteName: Joi.string().min(2).max(100).optional(),
    passingYear: Joi.string().pattern(/^(19|20)\d{2}$/).optional(),
    percentage: Joi.string().min(1).max(20).optional(),
    occupation: Joi.string().max(100).optional(),
    workExperience: Joi.string().max(50).optional(),
    organizationName: Joi.string().max(100).optional(),
    designation: Joi.string().max(100).optional(),
    selectedProgram: Joi.string().min(2).max(100).optional(),
    programMode: Joi.string().valid('Online', 'Offline', 'Hybrid').optional(),
    preferredStartDate: Joi.date().min('now').optional(),
    guardianName: Joi.string().max(100).optional(),
    guardianPhone: Joi.string().pattern(/^[6-9]\d{9}$/).optional(),
    guardianRelation: Joi.string().max(50).optional(),
    emergencyContactName: Joi.string().min(2).max(100).optional(),
    emergencyContactPhone: Joi.string().pattern(/^[6-9]\d{9}$/).optional(),
    emergencyContactRelation: Joi.string().min(2).max(50).optional(),
    howDidYouHear: Joi.string().max(100).optional(),
    specialRequirements: Joi.string().max(500).optional(),
    previousExperience: Joi.string().max(500).optional()
});

export const updateEventRegistrationParamsSchema = Joi.object({
    id: Joi.string().required()
});
