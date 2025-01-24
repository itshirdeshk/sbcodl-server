export const admissionParseJsonFieldsMiddleware = (req: any, res: any, next: any) => {
    // Check and parse 'permanentAddress' if it is a string
    if (req.body.permanentAddress && typeof req.body.permanentAddress === 'string') {
        req.body.permanentAddress = JSON.parse(req.body.permanentAddress);
    }

    // Check and parse 'correspondenceAddress' if it is a string
    if (req.body.correspondenceAddress && typeof req.body.correspondenceAddress === 'string') {
        req.body.correspondenceAddress = JSON.parse(req.body.correspondenceAddress);
    }

    // Check and parse 'educationalQualifications' if it is a string
    if (req.body.educationalQualifications && typeof req.body.educationalQualifications === 'string') {
        req.body.educationalQualifications = JSON.parse(req.body.educationalQualifications);
    }

    // Check and parse 'lastPassedExam' if it is a string
    if (req.body.lastPassedExam && typeof req.body.lastPassedExam === 'string') {
        req.body.lastPassedExam = JSON.parse(req.body.lastPassedExam);
    }

    // Check and parse 'subjectIds' if it is a string
    if (req.body.subjectIds && typeof req.body.subjectIds === 'string') {
        req.body.subjectIds = JSON.parse(req.body.subjectIds);
    }

    // Proceed to the next middleware or route handler
    next();
};
