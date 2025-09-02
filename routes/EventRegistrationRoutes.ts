import { Router } from "express";
import { afterParamsValidation, afterPayloadValidation, afterQueryValidation } from "../middlewares/RequestValidation";
import { createControllerHandlerFor } from "../middlewares/ControllerHandler";
import { CreateEventRegistration } from "../controller/common/eventRegistration/CreateEventRegistration";
import { UpdateEventRegistration } from "../controller/common/eventRegistration/UpdateEventRegistration";
import { GetEventRegistrationById } from "../controller/common/eventRegistration/GetEventRegistrationById";
import { GetEventRegistrations } from "../controller/common/eventRegistration/GetEventRegistrations";
import { DeleteEventRegistration } from "../controller/common/eventRegistration/DeleteEventRegistration";
import { UploadEventDocument, uploadEventDocumentSchema, uploadEventDocumentParamsSchema } from "../controller/common/eventRegistration/UploadEventDocument";
import { createEventRegistrationSchema } from "../validation/common/eventRegistration/CreateEventRegistration";
import { updateEventRegistrationSchema, updateEventRegistrationParamsSchema } from "../validation/common/eventRegistration/UpdateEventRegistration";
import { getEventRegistrationByIdParamsSchema } from "../validation/common/eventRegistration/GetEventRegistrationById";
import { getEventRegistrationsSchema } from "../validation/common/eventRegistration/GetEventRegistrations";
import { deleteEventRegistrationParamsSchema } from "../validation/common/eventRegistration/DeleteEventRegistration";
import { eventRegistrationFileUploadHandler } from "../middlewares/Multer";

const router = Router();

// Public routes for event registration
router.post(
    "/register", 
    afterPayloadValidation(createEventRegistrationSchema), 
    createControllerHandlerFor(CreateEventRegistration)
);

// Admin routes for managing event registrations (you might want to add authentication middleware here)
router.get(
    "/list", 
    afterQueryValidation(getEventRegistrationsSchema), 
    createControllerHandlerFor(GetEventRegistrations)
);

router.get(
    "/:id", 
    afterParamsValidation(getEventRegistrationByIdParamsSchema), 
    createControllerHandlerFor(GetEventRegistrationById)
);

router.put(
    "/:id", 
    afterParamsValidation(updateEventRegistrationParamsSchema),
    afterPayloadValidation(updateEventRegistrationSchema), 
    createControllerHandlerFor(UpdateEventRegistration)
);

router.delete(
    "/:id", 
    afterParamsValidation(deleteEventRegistrationParamsSchema), 
    createControllerHandlerFor(DeleteEventRegistration)
);

// Document upload route
router.post(
    "/:id/upload-document",
    eventRegistrationFileUploadHandler.single("document"),
    afterParamsValidation(uploadEventDocumentParamsSchema),
    afterPayloadValidation(uploadEventDocumentSchema),
    createControllerHandlerFor(UploadEventDocument)
);

export default router;
