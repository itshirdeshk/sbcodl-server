import { Router } from "express";
import { afterPayloadValidation, afterQueryValidation } from "../middlewares/RequestValidation";
import { initiatePaymentSchema } from "../validation/payment/InitiatePayment";
import { createControllerHandlerFor } from "../middlewares/ControllerHandler";
import { InitiatePayment } from "../controller/payment/InitiatePayment";
import { VerifyPayment } from "../controller/payment/VerifyPayment";
import { CheckPaymentStatus } from "../controller/payment/CheckPaymentStatus";
import { verifyPaymentSchema } from "../validation/payment/verifyPayment";

const router = Router();

// Payment
router.post("/initiate-payment", afterPayloadValidation(initiatePaymentSchema), createControllerHandlerFor(InitiatePayment));
router.post("/verify-payment", afterQueryValidation(verifyPaymentSchema), createControllerHandlerFor(VerifyPayment));
router.get("/check-payment-status/:merchantTransactionId", createControllerHandlerFor(CheckPaymentStatus));

export default router;