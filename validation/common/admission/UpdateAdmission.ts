import { AdmissionType, BatchType, CorrespondenceAddress, Country, DocumentType, EducationalQualification, ExaminationType, Gender, IndianState, LastPassedExam, PermanentAddress, StudentCategory, SubjectType } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateAdmissionRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
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

        instituteId: string;

        // For Uploading Documents
        documentId: string;
        documentType: DocumentType;
    };
}

export const updateAdmissionSchema = Joi.object({
    id: Joi.string().required(),
    admissionType: Joi.string()
        .valid(...Object.values(AdmissionType))

        .messages({
            'any.only': '{{#label}} must be one of: {{#valids}}',
        }),
    name: Joi.string(),
    dob: Joi.date(),
    fatherName: Joi.string(),
    motherName: Joi.string(),
    category: Joi.string()
        .valid(...Object.values(StudentCategory))

        .messages({
            'any.only': '{{#label}} must be one of: {{#valids}}',
        }),
    gender: Joi.string()
        .valid(...Object.values(Gender))

        .messages({
            'any.only': '{{#label}} must be one of: {{#valids}}',
        }),
    nationality: Joi.string(),
    courseId: Joi.string(),
    batch: Joi.string().valid(...Object.values(BatchType)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    subjectIds: Joi.array().items(Joi.string()),

    phoneNumber: Joi.string(),
    email: Joi.string().email(),

    permanentAddress: Joi.object({
        id: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        state: Joi.string().valid(...Object.values(IndianState)).required(),
        country: Joi.string().valid(...Object.values(Country)).required(),
        pincode: Joi.string().required(),
    }),

    correspondenceAddress: Joi.object({
        id: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        state: Joi.string().valid(...Object.values(IndianState)).required(),
        country: Joi.string().valid(...Object.values(Country)).required(),
        pincode: Joi.string().required(),
    }),

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
    })),

    lastPassedExam: Joi.object({
        id: Joi.string().required(),
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
    }),

    instituteId: Joi.string(),

    // For Uploading Documents
    documentId: Joi.string(),
    documentType: Joi.string().valid(...Object.values(DocumentType)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
})
