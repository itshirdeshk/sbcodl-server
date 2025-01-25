import express, { Request, Response } from "express";
import corsMiddleware from "./config/cors";
import { errorHandler } from "./error/ErrorHandler";
import adminRoutes from "./routes/AdminRoutes";
import instituteRoutes from "./routes/InstituteRoutes";
import studentRoutes, { router } from "./routes/StudentRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import path from "path";
import { afterParamsValidation, afterPayloadValidation } from "./middlewares/RequestValidation";
import { createEnquirySchema } from "./validation/common/enquiry/CreateEnquiry";
import { createControllerHandlerFor } from "./middlewares/ControllerHandler";
import { CreateEnquiry } from "./controller/common/enquiry/CreateEnquiry";
import { getSubjectsSchema } from "./validation/common/subject/GetSubjects";
import { GetCourses } from "./controller/common/course/GetCourses";
import { GetCourseById } from "./controller/common/course/GetCourseById";
import { getSubjectByIdSchema } from "./validation/common/subject/GetSubjectById";
import { getCoursesSchema } from "./validation/common/course/GetCourses";
import { getCourseByIdSchema } from "./validation/common/course/GetCourseById";
import { GetSubjects } from "./controller/common/subject/GetSubjects";
import { GetSubjectById } from "./controller/common/subject/GetSubjectById";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(corsMiddleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/api/admin", adminRoutes);
app.use("/api/institue", instituteRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/payment", PaymentRoutes);

// Enquiry	
app.post("/api/public/enquiry", afterPayloadValidation(createEnquirySchema), createControllerHandlerFor(CreateEnquiry));

// Course
app.get('/api/public/course/:id', afterParamsValidation(getCourseByIdSchema), createControllerHandlerFor(GetCourseById));
app.post('/api/public/course/list', afterPayloadValidation(getCoursesSchema), createControllerHandlerFor(GetCourses));

// Subject
app.get('/api/public/subject/:id', afterParamsValidation(getSubjectByIdSchema), createControllerHandlerFor(GetSubjectById));
app.post('/api/public/subject/list', afterPayloadValidation(getSubjectsSchema), createControllerHandlerFor(GetSubjects));

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
	res.status(200).send("Everything is fine");
});

app.get("*", (req: Request, res: Response) => {
	res.status(404).send("Not Found!");
});

app.listen(port, () => {
	console.log(
		`Server is running on ${port} with processID: ${process.pid}`
	);
});
