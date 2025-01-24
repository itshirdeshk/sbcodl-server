
import { NextFunction, Request, Response } from "express";
import {
	GeneralErrorCodes,
	PrismaErrorCodeMapping,
	PrismaErrorMessageMapping,
} from "../constants/ErrorCodes";
import { R } from "../constants/Resource";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(error);
	
	if (error instanceof PrismaClientKnownRequestError) {
		res.status(422).json({
			error:
				PrismaErrorCodeMapping[
				error.code as keyof typeof PrismaErrorCodeMapping
				] || GeneralErrorCodes.UNKNOWN,
			message:
				PrismaErrorMessageMapping[
				error.code as keyof typeof PrismaErrorMessageMapping
				] || R.ERROR_UNKNOWN,
			detail: "An unexpted exception has occured. Please try again",
		});
	} else if (error && error.error && error.error.isJoi) {
		res.status(422).json({
			error: error.errorCode || GeneralErrorCodes.UNKNOWN,
			message: error.error?.message || error.error.toString(),
			detail:
				"You received this error because you have sent invalid input payload",
		});
	} else if (error.statusCode) {
		res.status(error.statusCode).json({
			error: error.errorCode || GeneralErrorCodes.UNKNOWN,
			message: error.message,
			detail:
				error.detail || "An unexpted exception has occured. Please try again",
		});
	} else if (error instanceof jwt.TokenExpiredError) {
		res.header("WWW-Authenticate", "Bearer ")
		res.status(401).json({
			error: "token-expired",
			message: "Access token is expired",
			detail: "Your access token is expired. Please get new access token or authenticate again.",
		});
	} else {
		res.status(500).json({
			error: error?.code || GeneralErrorCodes.UNKNOWN,
			message: error?.message || "Internal server error",
			detail: "An unexpted exception has occured. Please try again",
		});
	}
};
