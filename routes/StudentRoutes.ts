import { Router } from "express";
import { afterParamsValidation, afterPayloadValidation } from "../middlewares/RequestValidation";
import { studentLoginSchema } from "../validation/student/StudentLogin";
import { createControllerHandlerFor } from "../middlewares/ControllerHandler";
import { StudentLogin } from "../controller/student/auth/StudentLogin";
import { admissionFileUploadHandler } from "../middlewares/Multer";
import { admissionParseJsonFieldsMiddleware } from "../middlewares/ParseJsonFields";
import { createAdmissionSchema } from "../validation/common/admission/CreateAdmission";
import { CreateAdmission } from "../controller/common/admission/CreateAdmission";
import { allowOnlyInstitute, allowOnlyStudent } from "../middlewares/Authentication";
import { updateAdmissionSchema } from "../validation/common/admission/UpdateAdmission";
import { UpdateAdmission } from "../controller/common/admission/UpdateAdmission";
import { GenerateEnrollmentNumber } from "../controller/common/admission/GenerateEnrollmentNumber";
import { GetStudentByIdForInstitute } from "../controller/common/student/GetStudentByIdForInstitute";
import { GetStudents } from "../controller/common/student/GetStudents";
import { generateEnrollmentNumberSchema } from "../validation/common/admission/GenerateEnrollmentNumber";
import { getStudentByIdSchema } from "../validation/common/student/GetStudentById";
import { getStudentsSchema } from "../validation/common/student/GetStudents";
import { GetCourseById } from "../controller/common/course/GetCourseById";
import { GetCourses } from "../controller/common/course/GetCourses";
import { GetNoticeById } from "../controller/common/notice/GetNoticeById";
import { GetNotices } from "../controller/common/notice/GetNotices";
import { GetResultById } from "../controller/common/result/GetResultById";
import { GetResults } from "../controller/common/result/GetResults";
import { GetSubjectById } from "../controller/common/subject/GetSubjectById";
import { GetSubjects } from "../controller/common/subject/GetSubjects";
import { getCourseByIdSchema } from "../validation/common/course/GetCourseById";
import { getCoursesSchema } from "../validation/common/course/GetCourses";
import { getNoticeByIdSchema } from "../validation/common/notice/GetNoticeById";
import { getNoticesSchema } from "../validation/common/notice/GetNotices";
import { getResultByIdSchema } from "../validation/common/result/GetResultById";
import { getResultsSchema } from "../validation/common/result/GetResults";
import { getSubjectByIdSchema } from "../validation/common/subject/GetSubjectById";
import { getSubjectsSchema } from "../validation/common/subject/GetSubjects";
import { GetStudentByIdForStudent } from "../controller/common/student/GetStudentByIdForStudent";

export const router = Router();

// Auth
router.post("/login", afterPayloadValidation(studentLoginSchema), createControllerHandlerFor(StudentLogin));

// Admission
router.post("/admission", admissionFileUploadHandler.single("image"), admissionParseJsonFieldsMiddleware, afterPayloadValidation(createAdmissionSchema), createControllerHandlerFor(CreateAdmission));
router.put("/admission", admissionFileUploadHandler.single("image"), allowOnlyStudent, admissionParseJsonFieldsMiddleware, afterPayloadValidation(updateAdmissionSchema), createControllerHandlerFor(UpdateAdmission));

router.get("/admission/enrollment-number/:applicationNumber", allowOnlyStudent, afterParamsValidation(generateEnrollmentNumberSchema), createControllerHandlerFor(GenerateEnrollmentNumber));

// Student
router.get("/student/:id", allowOnlyStudent, afterParamsValidation(getStudentByIdSchema), createControllerHandlerFor(GetStudentByIdForStudent));
router.post("/student/list", allowOnlyStudent, afterPayloadValidation(getStudentsSchema), createControllerHandlerFor(GetStudents));

// Result
router.get('/result/:id', allowOnlyStudent, afterParamsValidation(getResultByIdSchema), createControllerHandlerFor(GetResultById));
router.post('/result/list', allowOnlyStudent, afterPayloadValidation(getResultsSchema), createControllerHandlerFor(GetResults));

// Notice
router.get('/notice/:id', allowOnlyStudent, afterParamsValidation(getNoticeByIdSchema), createControllerHandlerFor(GetNoticeById));
router.post('/notice/list', allowOnlyStudent, afterPayloadValidation(getNoticesSchema), createControllerHandlerFor(GetNotices));

export default router;