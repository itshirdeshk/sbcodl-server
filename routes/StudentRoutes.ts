import { Router } from "express";
import { afterPayloadValidation } from "../middlewares/RequestValidation";
import { studentLoginSchema } from "../validation/student/StudentLogin";
import { createControllerHandlerFor } from "../middlewares/ControllerHandler";
import { StudentLogin } from "../controller/student/auth/StudentLogin";
import { admissionFileUploadHandler } from "../middlewares/Multer";
import { admissionParseJsonFieldsMiddleware } from "../middlewares/ParseJsonFields";
import { createAdmissionSchema } from "../validation/common/admission/CreateAdmission";
import { CreateAdmission } from "../controller/common/admission/CreateAdmission";
import { allowOnlyStudent } from "../middlewares/Authentication";
import { updateAdmissionSchema } from "../validation/common/admission/UpdateAdmission";
import { UpdateAdmission } from "../controller/common/admission/UpdateAdmission";

const router = Router();

// Auth
router.post("/login", afterPayloadValidation(studentLoginSchema), createControllerHandlerFor(StudentLogin));

// Admission
router.post("/admission", admissionFileUploadHandler.single("image"), admissionParseJsonFieldsMiddleware, afterPayloadValidation(createAdmissionSchema), createControllerHandlerFor(CreateAdmission));
router.put("/admission", admissionFileUploadHandler.single("image"), allowOnlyStudent, admissionParseJsonFieldsMiddleware, afterPayloadValidation(updateAdmissionSchema), createControllerHandlerFor(UpdateAdmission));

export default router;