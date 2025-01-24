import { Country, Gender, IndianState, InstituteDocumentType, UnionTerritory } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateInstituteRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        applicationNumber: string;

        headDob: string;
        headName: string;
        headFatherName: string;
        headAadharNumber: string;
        headPanCardNumber: string;
        headMobileNumber: string;
        headEmailId: string;
        headGender: Gender;
        headAddress: string;
        headCity: string;
        headState: IndianState;
        headUnionTerritory: UnionTerritory;
        headCountry: Country;
        headPincode: string;
        headBankName: string;
        headAccountNumber: string;
        headIfscCode: string;

        centerCode: string;
        centerName: string;
        centerEmailId: string;
        centerWebsiteUrl: string;
        centerPhoneNumber: string;
        centerAddress: string;
        centerCity: string;
        centerState: IndianState;
        centerUnionTerritory: UnionTerritory;
        centerCountry: Country;
        centerPincode: string;

        documentId: string;
        documentType: InstituteDocumentType;
    };
}

export const updateInsituteSchema = Joi.object({
    applicationNumber: Joi.string().required(),

    headDob: Joi.string(),
    headName: Joi.string(),
    headFatherName: Joi.string(),
    headAadharNumber: Joi.string(),
    headPanCardNumber: Joi.string(),
    headMobileNumber: Joi.string(),
    headEmailId: Joi.string().email(),
    headGender: Joi.string().valid(...Object.values(Gender)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    headAddress: Joi.string(),
    headCity: Joi.string(),
    headState: Joi.string().valid(...Object.values(IndianState)),
    headUnionTerritory: Joi.string().valid(...Object.values(UnionTerritory)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    headCountry: Joi.string().valid(...Object.values(Country)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    headPincode: Joi.string(),
    headBankName: Joi.string(),
    headAccountNumber: Joi.string(),
    headIfscCode: Joi.string(),

    centerCode: Joi.string(),
    centerName: Joi.string(),
    centerEmailId: Joi.string().email(),
    centerWebsiteUrl: Joi.string(),
    centerPhoneNumber: Joi.string(),
    centerAddress: Joi.string(),
    centerCity: Joi.string(),
    centerState: Joi.string().valid(...Object.values(IndianState)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    centerUnionTerritory: Joi.string().valid(...Object.values(UnionTerritory)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    centerCountry: Joi.string().valid(...Object.values(Country)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    centerPincode: Joi.string(),

    documentId: Joi.string(),
    documentType: Joi.string().valid(...Object.values(InstituteDocumentType)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }).when('documentId', {
        is: Joi.string().required(),
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
})
