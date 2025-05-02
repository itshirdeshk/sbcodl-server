import { Router } from "express";
import { instituteLoginSchema } from "../validation/institute/InstituteLogin";
import { afterParamsValidation, afterPayloadValidation } from "../middlewares/RequestValidation";
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
import { GenerateEnrollmentNumber } from "../controller/common/admission/GenerateEnrollmentNumber";
import { generateEnrollmentNumberSchema } from "../validation/common/admission/GenerateEnrollmentNumber";
import { GetStudentByIdForInstitute } from "../controller/common/student/GetStudentByIdForInstitute";
import { GetStudents } from "../controller/common/student/GetStudents";
import { getStudentByIdSchema } from "../validation/common/student/GetStudentById";
import { getStudentsSchema } from "../validation/common/student/GetStudents";
import { GenerateInstituteRegistrationNumber } from "../controller/common/institute/GenerateInstituteRegistrationNumber";
import { generateInstituteRegistrationNumberSchema } from "../validation/common/institute/GenerateInstituteRegistrationNumber";
import { GetInstituteById } from "../controller/common/institute/GetInstituteById";
import { GetInstitutes } from "../controller/common/institute/GetInstitutes";
import { getInstituteByIdSchema } from "../validation/common/institute/GetInstituteById";
import { getInstitutesSchema } from "../validation/common/institute/GetInstitutes";
import { GetResultById } from "../controller/common/result/GetResultById";
import { GetResults } from "../controller/common/result/GetResults";
import { getResultByIdSchema } from "../validation/common/result/GetResultById";
import { getResultsSchema } from "../validation/common/result/GetResults";
import { GetNoticeById } from "../controller/common/notice/GetNoticeById";
import { GetNotices } from "../controller/common/notice/GetNotices";
import { getNoticeByIdSchema } from "../validation/common/notice/GetNoticeById";
import { getNoticesSchema } from "../validation/common/notice/GetNotices";
import { getAllPaymentsForInstituteSchema } from "../validation/payment/GetAllPaymentsForInstitute";
import { GetAllPaymentsForInstitute } from "../controller/payment/GetAllPaymentsForInstitute";

export const router = Router();

// Auth
router.post("/auth/login", afterPayloadValidation(instituteLoginSchema), createControllerHandlerFor(InstituteLogin));

// Admission
router.post("/admission", admissionFileUploadHandler.single("image"), allowOnlyInstitute, admissionParseJsonFieldsMiddleware, afterPayloadValidation(createAdmissionSchema), createControllerHandlerFor(CreateAdmission));
router.put("/admission", admissionFileUploadHandler.single("image"), allowOnlyInstitute, admissionParseJsonFieldsMiddleware, afterPayloadValidation(updateAdmissionSchema), createControllerHandlerFor(UpdateAdmission));

router.get("/admission/enrollment-number/:applicationNumber", allowOnlyInstitute, afterParamsValidation(generateEnrollmentNumberSchema), createControllerHandlerFor(GenerateEnrollmentNumber));

// Student
router.get("/student/:id", allowOnlyInstitute, afterParamsValidation(getStudentByIdSchema), createControllerHandlerFor(GetStudentByIdForInstitute));
router.post("/student/list", allowOnlyInstitute, afterPayloadValidation(getStudentsSchema), createControllerHandlerFor(GetStudents));

// Instiute
router.post("/institute", instituteFileUploadHandler.single('image'), afterPayloadValidation(createInsituteSchema), createControllerHandlerFor(CreateInstitute));
router.put("/institute", instituteFileUploadHandler.single('image'), allowOnlyInstitute, afterPayloadValidation(updateInsituteSchema), createControllerHandlerFor(UpdateInstitute));

router.get("/institute/registration-number/:applicationNumber", allowOnlyInstitute, afterParamsValidation(generateInstituteRegistrationNumberSchema), createControllerHandlerFor(GenerateInstituteRegistrationNumber));

router.get("/institute/:id", allowOnlyInstitute, afterParamsValidation(getInstituteByIdSchema), createControllerHandlerFor(GetInstituteById));
router.post("/institute/list", allowOnlyInstitute, afterPayloadValidation(getInstitutesSchema), createControllerHandlerFor(GetInstitutes));

// Result
router.get('/result/:id', allowOnlyInstitute, afterParamsValidation(getResultByIdSchema), createControllerHandlerFor(GetResultById));
router.post('/result/list', allowOnlyInstitute, afterPayloadValidation(getResultsSchema), createControllerHandlerFor(GetResults));

// Notice
router.get('/notice/:id', allowOnlyInstitute, afterParamsValidation(getNoticeByIdSchema), createControllerHandlerFor(GetNoticeById));
router.post('/notice/list', allowOnlyInstitute, afterPayloadValidation(getNoticesSchema), createControllerHandlerFor(GetNotices));

router.post("/payment/list", allowOnlyInstitute, afterPayloadValidation(getAllPaymentsForInstituteSchema), createControllerHandlerFor(GetAllPaymentsForInstitute));

export default router;