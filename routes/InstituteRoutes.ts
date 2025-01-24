import { Router } from "express";
import { instituteLoginSchema } from "../validation/institute/InstituteLogin";
import { afterPayloadValidation } from "../middlewares/RequestValidation";
import { createControllerHandlerFor } from "../middlewares/ControllerHandler";
import { InstituteLogin } from "../controller/institute/auth/InstituteLogin";
import { allowOnlyInstitute } from "../middlewares/Authentication";
import { admissionParseJsonFieldsMiddleware } from "../middlewares/ParseJsonFields";
import { admissionFileUploadHandler, instituteFileUploadHandler } from "../middlewares/Multer";
import { createAdmissionSchema } from "../validation/common/admission/CreateAdmission";
import { CreateAdmission } from "../controller/common/admission/CreateAdmission";
import { updateAdmissionSchema } from "../validation/common/admission/UpdateAdmission";
import { UpdateAdmission } from "../controller/common/admission/UpdateAdmission";
import { createInsituteSchema } from "../validation/common/institute/CreateInstitute";
import { CreateInstitute } from "../controller/common/institute/CreateInstitute";
import { updateInsituteSchema } from "../validation/common/institute/UpdateInstitute";
import { UpdateInstitute } from "../controller/common/institute/UpdateInstitute";

const router = Router();

// Auth
router.post("/auth/login", afterPayloadValidation(instituteLoginSchema), createControllerHandlerFor(InstituteLogin));

// Admission
router.post("/admission", admissionFileUploadHandler.single("image"), allowOnlyInstitute, admissionParseJsonFieldsMiddleware, afterPayloadValidation(createAdmissionSchema), createControllerHandlerFor(CreateAdmission));
router.put("/admission", admissionFileUploadHandler.single("image"), allowOnlyInstitute, admissionParseJsonFieldsMiddleware, afterPayloadValidation(updateAdmissionSchema), createControllerHandlerFor(UpdateAdmission));

// Instiute
router.post("/institute", instituteFileUploadHandler.single('image'), afterPayloadValidation(createInsituteSchema), createControllerHandlerFor(CreateInstitute));
router.put("/institute", instituteFileUploadHandler.single('image'), allowOnlyInstitute, afterPayloadValidation(updateInsituteSchema), createControllerHandlerFor(UpdateInstitute));

export default router;