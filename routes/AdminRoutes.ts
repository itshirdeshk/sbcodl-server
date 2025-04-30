import { Router } from "express";
import { afterParamsValidation, afterPayloadValidation } from "../middlewares/RequestValidation";
import { createControllerHandlerFor } from "../middlewares/ControllerHandler";
import { createSubjectSchema } from "../validation/admin/subject/CreateSubject";
import { CreateSubject } from "../controller/admin/subject/CreateSubject";
import { updateSubjectSchema } from "../validation/admin/subject/UpdateSubject";
import { UpdateSubject } from "../controller/admin/subject/UpdateSubject";
import { deleteSubjectSchema } from "../validation/admin/subject/DeleteSubject";
import { DeleteSubject } from "../controller/admin/subject/DeleteSubject";
import { createNoticeSchema } from "../validation/admin/notice/CreateNotice";
import { updateNoticeSchema } from "../validation/admin/notice/UpdateNotice";
import { deleteNoticeSchema } from "../validation/admin/notice/DeleteNotice";
import { CreateNotice } from "../controller/admin/notice/CreateNotice";
import { UpdateNotice } from "../controller/admin/notice/UpdateNotice";
import { DeleteNotice } from "../controller/admin/notice/DeleteNotice";
import { adminRegisterSchema } from "../validation/admin/auth/AdminRegister";
import { adminLogicSchema } from "../validation/admin/auth/AdminLogin";
import { AdminRegister } from "../controller/admin/auth/AdminRegister";
import { AdminLogin } from "../controller/admin/auth/AdminLogin";
import { allowOnlyAdmin } from "../middlewares/Authentication";
import { admissionFileUploadHandler, instituteFileUploadHandler } from "../middlewares/Multer";
import { createAdmissionSchema } from "../validation/common/admission/CreateAdmission";
import { CreateAdmission } from "../controller/common/admission/CreateAdmission";
import { admissionParseJsonFieldsMiddleware } from "../middlewares/ParseJsonFields";
import { updateAdmissionSchema } from "../validation/common/admission/UpdateAdmission";
import { UpdateAdmission } from "../controller/common/admission/UpdateAdmission";
import { deleteAdmissionSchema } from "../validation/common/admission/DeleteAdmission";
import { DeleteAdmission } from "../controller/common/admission/DeleteAdmission";
import { createInsituteSchema } from "../validation/common/institute/CreateInstitute";
import { CreateInstitute } from "../controller/common/institute/CreateInstitute";
import { updateInsituteSchema } from "../validation/common/institute/UpdateInstitute";
import { UpdateInstitute } from "../controller/common/institute/UpdateInstitute";
import { deleteInstituteSchema } from "../validation/common/institute/DeleteInstitute";
import { DeleteInstitute } from "../controller/common/institute/DeleteInstitute";
import { createCourseSchema } from "../validation/admin/course/CreateCourse";
import { CreateCourse } from "../controller/admin/course/CreateCourse";
import { updateCourseSchema } from "../validation/admin/course/UpdateCourse";
import { deleteCourseSchema } from "../validation/admin/course/DeleteCourse";
import { UpdateCourse } from "../controller/admin/course/UpdateCourse";
import { DeleteCourse } from "../controller/admin/course/DeleteCourse";
import { createResultSchema } from "../validation/admin/result/CreateResult";
import { CreateResult } from "../controller/admin/result/CreateResult";
import { updateResultSchema } from "../validation/admin/result/UpdateResult";
import { UpdateResult } from "../controller/admin/result/UpdateResult";
import { deleteResultSchema } from "../validation/admin/result/DeleteResult";
import { DeleteResult } from "../controller/admin/result/DeleteResult";
import { updateEnquirySchema } from "../validation/common/enquiry/UpdateEnquiry";
import { UpdateEnquiry } from "../controller/common/enquiry/UpdateEnquiry";
import { deleteEnquirySchema } from "../validation/common/enquiry/DeleteEnquiry";
import { DeleteEnquiry } from "../controller/common/enquiry/DeleteEnquiry";
import { generateInstituteRegistrationNumberSchema } from "../validation/common/institute/GenerateInstituteRegistrationNumber";
import { GenerateInstituteRegistrationNumber } from "../controller/common/institute/GenerateInstituteRegistrationNumber";
import { getCourseByIdSchema } from "../validation/common/course/GetCourseById";
import { GetCourseById } from "../controller/common/course/GetCourseById";
import { getCoursesSchema } from "../validation/common/course/GetCourses";
import { GetCourses } from "../controller/common/course/GetCourses";
import { getSubjectByIdSchema } from "../validation/common/subject/GetSubjectById";
import { getSubjectsSchema } from "../validation/common/subject/GetSubjects";
import { GetSubjectById } from "../controller/common/subject/GetSubjectById";
import { GetSubjects } from "../controller/common/subject/GetSubjects";
import { getEnquiryByIdSchema } from "../validation/admin/enquiry/GetEnquiryById";
import { getEnquiresSchema } from "../validation/admin/enquiry/GetEnquires";
import { GetEnquiryById } from "../controller/admin/enquiry/GetEnquiryById";
import { GetEnquiries } from "../controller/admin/enquiry/GetEnquires";
import { getNoticeByIdSchema } from "../validation/common/notice/GetNoticeById";
import { getNoticesSchema } from "../validation/common/notice/GetNotices";
import { GetNoticeById } from "../controller/common/notice/GetNoticeById";
import { GetNotices } from "../controller/common/notice/GetNotices";
import { getResultByIdSchema } from "../validation/common/result/GetResultById";
import { getResultsSchema } from "../validation/common/result/GetResults";
import { GetResultById } from "../controller/common/result/GetResultById";
import { GetResults } from "../controller/common/result/GetResults";
import { getStudentByIdSchema } from "../validation/common/student/GetStudentById";
import { getStudentsSchema } from "../validation/common/student/GetStudents";
import { GetStudents } from "../controller/common/student/GetStudents";
import { generateEnrollmentNumberSchema } from "../validation/common/admission/GenerateEnrollmentNumber";
import { GenerateEnrollmentNumber } from "../controller/common/admission/GenerateEnrollmentNumber";
import { getInstituteByIdSchema } from "../validation/common/institute/GetInstituteById";
import { getInstitutesSchema } from "../validation/common/institute/GetInstitutes";
import { GetInstituteById } from "../controller/common/institute/GetInstituteById";
import { GetInstitutes } from "../controller/common/institute/GetInstitutes";
import { GetStudentByIdForStudent } from "../controller/common/student/GetStudentByIdForStudent";
import { getAllPaymentsSchema } from "../validation/payment/GetAllPayments";
import { GetAllPayments } from "../controller/payment/GetAllPayments";


export const router = Router();

// Auth
router.post("/auth/register", afterPayloadValidation(adminRegisterSchema), createControllerHandlerFor(AdminRegister));
router.post("/auth/login", afterPayloadValidation(adminLogicSchema), createControllerHandlerFor(AdminLogin));

// Admission
router.post("/admission", admissionFileUploadHandler.single("image"), allowOnlyAdmin, admissionParseJsonFieldsMiddleware, afterPayloadValidation(createAdmissionSchema), createControllerHandlerFor(CreateAdmission));
router.put("/admission", admissionFileUploadHandler.single("image"), allowOnlyAdmin, admissionParseJsonFieldsMiddleware, afterPayloadValidation(updateAdmissionSchema), createControllerHandlerFor(UpdateAdmission));
router.delete("/admission/:id", allowOnlyAdmin, afterParamsValidation(deleteAdmissionSchema), createControllerHandlerFor(DeleteAdmission));

router.get("/admission/enrollment-number/:applicationNumber", allowOnlyAdmin, afterParamsValidation(generateEnrollmentNumberSchema), createControllerHandlerFor(GenerateEnrollmentNumber));

// Student
router.get("/student/:id", allowOnlyAdmin, afterParamsValidation(getStudentByIdSchema), createControllerHandlerFor(GetStudentByIdForStudent));
router.post("/student/list", allowOnlyAdmin, afterPayloadValidation(getStudentsSchema), createControllerHandlerFor(GetStudents));

// Institute
router.post("/institute", instituteFileUploadHandler.single('image'), allowOnlyAdmin, afterPayloadValidation(createInsituteSchema), createControllerHandlerFor(CreateInstitute));
router.put("/institute", instituteFileUploadHandler.single('image'), allowOnlyAdmin, afterPayloadValidation(updateInsituteSchema), createControllerHandlerFor(UpdateInstitute));
router.delete("/institute/:id", allowOnlyAdmin, afterParamsValidation(deleteInstituteSchema), createControllerHandlerFor(DeleteInstitute));
router.get("/institute/registration-number/:applicationNumber", allowOnlyAdmin, afterParamsValidation(generateInstituteRegistrationNumberSchema), createControllerHandlerFor(GenerateInstituteRegistrationNumber));

router.get("/institute/:id", allowOnlyAdmin, afterParamsValidation(getInstituteByIdSchema), createControllerHandlerFor(GetInstituteById));
router.post("/institute/list", allowOnlyAdmin, afterPayloadValidation(getInstitutesSchema), createControllerHandlerFor(GetInstitutes));

// Course
router.post("/course", allowOnlyAdmin, afterPayloadValidation(createCourseSchema), createControllerHandlerFor(CreateCourse));
router.put("/course", allowOnlyAdmin, afterPayloadValidation(updateCourseSchema), createControllerHandlerFor(UpdateCourse));
router.delete("/course/:id", allowOnlyAdmin, afterParamsValidation(deleteCourseSchema), createControllerHandlerFor(DeleteCourse));

router.get('/course/:id', allowOnlyAdmin, afterParamsValidation(getCourseByIdSchema), createControllerHandlerFor(GetCourseById));
router.post('/course/list', allowOnlyAdmin, afterPayloadValidation(getCoursesSchema), createControllerHandlerFor(GetCourses));

// Subject
router.post("/subject", allowOnlyAdmin, afterPayloadValidation(createSubjectSchema), createControllerHandlerFor(CreateSubject));
router.put("/subject", allowOnlyAdmin, afterPayloadValidation(updateSubjectSchema), createControllerHandlerFor(UpdateSubject));
router.delete("/subject/:id", allowOnlyAdmin, afterParamsValidation(deleteSubjectSchema), createControllerHandlerFor(DeleteSubject));

router.get('/subject/:id', allowOnlyAdmin, afterParamsValidation(getSubjectByIdSchema), createControllerHandlerFor(GetSubjectById));
router.post('/subject/list', allowOnlyAdmin, afterPayloadValidation(getSubjectsSchema), createControllerHandlerFor(GetSubjects));

// Result
router.post("/result", allowOnlyAdmin, afterPayloadValidation(createResultSchema), createControllerHandlerFor(CreateResult));
router.put("/result", allowOnlyAdmin, afterPayloadValidation(updateResultSchema), createControllerHandlerFor(UpdateResult));
router.delete("/result/:id", allowOnlyAdmin, afterParamsValidation(deleteResultSchema), createControllerHandlerFor(DeleteResult));

router.get('/result/:id', allowOnlyAdmin, afterParamsValidation(getResultByIdSchema), createControllerHandlerFor(GetResultById));
router.post('/result/list', allowOnlyAdmin, afterPayloadValidation(getResultsSchema), createControllerHandlerFor(GetResults));

// Notice
router.post("/notice", allowOnlyAdmin, afterPayloadValidation(createNoticeSchema), createControllerHandlerFor(CreateNotice));
router.put("/notice", allowOnlyAdmin, afterPayloadValidation(updateNoticeSchema), createControllerHandlerFor(UpdateNotice));
router.delete("/notice/:id", allowOnlyAdmin, afterParamsValidation(deleteNoticeSchema), createControllerHandlerFor(DeleteNotice));

router.get('/notice/:id', allowOnlyAdmin, afterParamsValidation(getNoticeByIdSchema), createControllerHandlerFor(GetNoticeById));
router.post('/notice/list', allowOnlyAdmin, afterPayloadValidation(getNoticesSchema), createControllerHandlerFor(GetNotices));

// Enquiry
router.put("/enquiry", allowOnlyAdmin, afterPayloadValidation(updateEnquirySchema), createControllerHandlerFor(UpdateEnquiry));
router.delete("/enquiry/:id", allowOnlyAdmin, afterParamsValidation(deleteEnquirySchema), createControllerHandlerFor(DeleteEnquiry));

router.get('/enquiry/:id', allowOnlyAdmin, afterParamsValidation(getEnquiryByIdSchema), createControllerHandlerFor(GetEnquiryById));
router.post('/enquiry/list', allowOnlyAdmin, afterPayloadValidation(getEnquiresSchema), createControllerHandlerFor(GetEnquiries));

// Payment
router.post('/payment/list', allowOnlyAdmin, afterPayloadValidation(getAllPaymentsSchema), createControllerHandlerFor(GetAllPayments));

export default router;