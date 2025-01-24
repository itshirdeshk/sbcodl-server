import { AdmissionType, BatchType, CorrespondenceAddress, Country, EducationalQualification, ExaminationType, Gender, IndianState, LastPassedExam, PaymentStatus, PermanentAddress, StudentCategory, SubjectType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface CreateAdmissionRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        admissionType: AdmissionType;
        name: string;
        dob: Date;
        fatherName: string;
        motherName: string;
        category: StudentCategory;
        gender: Gender;
        nationality: string;
        courseId: string;
        batch: BatchType;
        subjectIds: string[];

        phoneNumber: string;
        email: string;

        permanentAddress: PermanentAddress;
        correspondenceAddress: CorrespondenceAddress;
        educationalQualifications: EducationalQualification[];
        lastPassedExam: LastPassedExam;
        
        paymentAmount: number;

        instituteId: string;
    };
}

export const createAdmissionSchema = Joi.object({
    admissionType: Joi.string()
        .valid(...Object.values(AdmissionType))
        .required()
        .messages({
            'any.only': '{{#label}} must be one of: {{#valids}}',
        }),
    name: Joi.string().required(),
    dob: Joi.date().required(),
    fatherName: Joi.string().required(),
    motherName: Joi.string().required(),
    category: Joi.string()
        .valid(...Object.values(StudentCategory))
        .required()
        .messages({
            'any.only': '{{#label}} must be one of: {{#valids}}',
        }),
    gender: Joi.string()
        .valid(...Object.values(Gender))
        .required()
        .messages({
            'any.only': '{{#label}} must be one of: {{#valids}}',
        }),
    nationality: Joi.string().required(),
    courseId: Joi.string().required(),
    batch: Joi.string().valid(...Object.values(BatchType)).required().messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    subjectIds: Joi.array().items(Joi.string().required()),

    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),

    permanentAddress: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        state: Joi.string().valid(...Object.values(IndianState)).required(),
        country: Joi.string().valid(...Object.values(Country)).required(),
        pincode: Joi.string().required(),
    }).required(),

    correspondenceAddress: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        state: Joi.string().valid(...Object.values(IndianState)).required(),
        country: Joi.string().valid(...Object.values(Country)).required(),
        pincode: Joi.string().required(),
    }).required(),

    educationalQualifications: Joi.array().items(Joi.object({
        examination: Joi.string()
            .valid(...Object.values(ExaminationType))
            .required()
            .messages({
                'any.only': '{{#label}} must be one of: {{#valids}}',
            }),
        subjects: Joi.string().required(),
        board: Joi.string(),
        university: Joi.string(),
        yearOfPassing: Joi.string().required(),
        division: Joi.string(),
        grade: Joi.string(),
        percentage: Joi.number().required(),
    })).required(),

    lastPassedExam: Joi.object({
        subjectType: Joi.string()
            .valid(...Object.values(SubjectType))
            .required()
            .messages({
                'any.only': '{{#label}} must be one of: {{#valids}}',
            }),
        subject: Joi.string().required(),
        practicalMarks: Joi.number().required(),
        assignmentMarks: Joi.number().required(),
        theoryMarks: Joi.number().required(),
        obtainedMarks: Joi.number().required(),
        maximumMarks: Joi.number().required(),
    }).when('admissionType', {
        is: AdmissionType.TOC || AdmissionType.PART_ADMISSION,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),

    paymentAmount: Joi.number().required(),

    instituteId: Joi.string(),
})
