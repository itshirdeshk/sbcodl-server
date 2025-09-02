
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE", 
    OTHER = "OTHER"
}

export interface CreateEventRegistrationRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        dateOfBirth: Date;
        gender: Gender;
        address: string;
        city: string;
        state: string;
        pincode: string;
        country: string;
        qualification?: string;
        instituteName?: string;
        occupation?: string;
        organizationName?: string;
        designation?: string;
        guardianName?: string;
        guardianPhone?: string;
        guardianRelation?: string;
        emergencyContactName: string;
        emergencyContactPhone: string;
        emergencyContactRelation: string;
        howDidYouHear?: string;
        specialRequirements?: string;
        previousExperience?: string;
        paymentAmount: number;
        optForFood?: boolean;
    };
}

export const createEventRegistrationSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 50 characters',
        'any.required': 'First name is required'
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
        'string.min': 'Last name must be at least 2 characters long',
        'string.max': 'Last name cannot exceed 50 characters',
        'any.required': 'Last name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({
        'string.pattern.base': 'Please provide a valid 10-digit mobile number',
        'any.required': 'Phone number is required'
    }),
    dateOfBirth: Joi.date().max('now').required().messages({
        'date.max': 'Date of birth cannot be in the future',
        'any.required': 'Date of birth is required'
    }),
    gender: Joi.string()
        .valid(...Object.values(Gender))
        .required()
        .messages({
            'any.only': 'Gender must be one of: {{#valids}}',
            'any.required': 'Gender is required'
        }),
    address: Joi.string().min(10).max(200).required().messages({
        'string.min': 'Address must be at least 10 characters long',
        'string.max': 'Address cannot exceed 200 characters',
        'any.required': 'Address is required'
    }),
    city: Joi.string().min(2).max(50).required().messages({
        'string.min': 'City must be at least 2 characters long',
        'string.max': 'City cannot exceed 50 characters',
        'any.required': 'City is required'
    }),
    state: Joi.string().min(2).max(50).required().messages({
        'string.min': 'State must be at least 2 characters long',
        'string.max': 'State cannot exceed 50 characters',
        'any.required': 'State is required'
    }),
    pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).required().messages({
        'string.pattern.base': 'Please provide a valid 6-digit pincode',
        'any.required': 'Pincode is required'
    }),
    country: Joi.string().min(2).max(50).default('India'),
    qualification: Joi.string().min(2).max(100).allow('').optional(),
    instituteName: Joi.string().min(2).max(100).allow('').optional(),
    occupation: Joi.string().max(100).allow('').optional(),
    organizationName: Joi.string().max(100).allow('').optional(),
    designation: Joi.string().max(100).allow('').optional(),
    guardianName: Joi.string().max(100).allow('').optional(),
    guardianPhone: Joi.string().pattern(/^[6-9]\d{9}$/).allow('').optional().messages({
        'string.pattern.base': 'Please provide a valid 10-digit guardian mobile number'
    }),
    guardianRelation: Joi.string().max(50).allow('').optional(),
    emergencyContactName: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Emergency contact name must be at least 2 characters long',
        'string.max': 'Emergency contact name cannot exceed 100 characters',
        'any.required': 'Emergency contact name is required'
    }),
    emergencyContactPhone: Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({
        'string.pattern.base': 'Please provide a valid 10-digit emergency contact number',
        'any.required': 'Emergency contact phone is required'
    }),
    emergencyContactRelation: Joi.string().min(2).max(50).required().messages({
        'string.min': 'Emergency contact relation must be at least 2 characters long',
        'string.max': 'Emergency contact relation cannot exceed 50 characters',
        'any.required': 'Emergency contact relation is required'
    }),
    howDidYouHear: Joi.string().max(100).allow('').optional(),
    specialRequirements: Joi.string().max(500).allow('').optional(),
    previousExperience: Joi.string().max(500).allow('').optional(),
    paymentAmount: Joi.number().positive().required().messages({
        'number.positive': 'Payment amount must be greater than 0',
        'any.required': 'Payment amount is required'
    }),
    optForFood: Joi.boolean().optional()
});
