import { Router } from "express";
import { afterPayloadValidation, afterQueryValidation } from "../middlewares/RequestValidation";
import { initiatePaymentSchema } from "../validation/payment/InitiatePayment";
import { createControllerHandlerFor } from "../middlewares/ControllerHandler";
import { InitiatePayment } from "../controller/payment/InitiatePayment";
import { VerifyPayment } from "../controller/payment/VerifyPayment";
import { GetPaymentDetails } from "../controller/payment/GetPaymentDetails";
import { verifyPaymentSchema } from "../validation/payment/verifyPayment";
import { getPaymentDetailsSchema } from "../validation/payment/getPaymentDetails";

const router = Router();

// Payment
router.post("/initiate-payment", afterPayloadValidation(initiatePaymentSchema), createControllerHandlerFor(InitiatePayment));
router.post("/verify-payment", afterQueryValidation(verifyPaymentSchema), createControllerHandlerFor(VerifyPayment));
router.get("/get-payment-details", afterQueryValidation(getPaymentDetailsSchema), createControllerHandlerFor(GetPaymentDetails));

export default router;