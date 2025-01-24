import { Country, Gender, IndianState, UnionTerritory } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface CreateInstituteRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
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
    };
}

export const createInsituteSchema = Joi.object({
    headDob: Joi.string().required(),
    headName: Joi.string().required(),
    headFatherName: Joi.string().required(),
    headAadharNumber: Joi.string().required(),
    headPanCardNumber: Joi.string().required(),
    headMobileNumber: Joi.string().required(),
    headEmailId: Joi.string().email().required(),
    headGender: Joi.string().valid(...Object.values(Gender)).required().messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    headAddress: Joi.string().required(),
    headCity: Joi.string().required(),
    headState: Joi.string().valid(...Object.values(IndianState)),
    headUnionTerritory: Joi.string().valid(...Object.values(UnionTerritory)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    headCountry: Joi.string().valid(...Object.values(Country)).required().messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    headPincode: Joi.string().required(),
    headBankName: Joi.string().required(),
    headAccountNumber: Joi.string().required(),
    headIfscCode: Joi.string().required(),

    centerName: Joi.string().required(),
    centerEmailId: Joi.string().email().required(),
    centerWebsiteUrl: Joi.string().required(),
    centerPhoneNumber: Joi.string().required(),
    centerAddress: Joi.string().required(),
    centerCity: Joi.string().required(),
    centerState: Joi.string().valid(...Object.values(IndianState)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    centerUnionTerritory: Joi.string().valid(...Object.values(UnionTerritory)).messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    centerCountry: Joi.string().valid(...Object.values(Country)).required().messages({
        'any.only': '{{#label}} must be one of: {{#valids}}',
    }),
    centerPincode: Joi.string().required(),
}).xor('headState', 'headUnionTerritory').xor('centerState', 'centerUnionTerritory');
