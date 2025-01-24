import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator({ passError: true });

export const afterPayloadValidation = (schema: Joi.Schema) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const validationMiddleware = validator.body(schema);
            validationMiddleware(req, res, next);
        } catch (e) {
            next(e);
        }
    };
}

export const afterParamsValidation = (schema: Joi.Schema) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const validationMiddleware = validator.params(schema);
            validationMiddleware(req, res, next);
        } catch (e) {
            next(e);
        }
    };
}

export const afterQueryValidation = (schema: Joi.Schema) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const validationMiddleware = validator.query(schema);
            validationMiddleware(req, res, next);
        } catch (e) {
            next(e);
        }
    };
}
