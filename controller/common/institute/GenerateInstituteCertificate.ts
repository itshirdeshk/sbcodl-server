import { ValidatedRequest } from "express-joi-validation";
import prisma from "../../../prisma/prismaInstance";
import { Error } from "../../../error/Error";
import { GeneralErrorCodes } from "../../../constants/ErrorCodes";
import { R } from "../../../constants/Resource";
import { GenerateInstituteCertificateRequestSchema } from "../../../validation/common/institute/GenerateInstituteCertificate";
import { InstituteDocumentType } from "@prisma/client";
import path from "path";
import ejs from "ejs";
import puppeteer from "puppeteer";
import sftpService from "../../../services/sftpService";

export const GenerateInstituteCertificate = async (
    req: ValidatedRequest<GenerateInstituteCertificateRequestSchema>,

) => {
    const {
        registrationNumber
    } = req.params;

    const institute = await prisma.institute.findUnique({
        where: {
            registrationNumber: registrationNumber,
        },
        include: {
            documents: {
                where: {
                    documentType: InstituteDocumentType.ACCREDITATION_CERTIFICATE
                }
            }
        }
    });

    if (!institute) {
        throw new Error(404, GeneralErrorCodes.UNKNOWN, R.ERROR_UNKNOWN);
    }

    if (institute.documents.length >= 1) {
        return {
            certificateUrl: institute.documents[0].fileUrl,
            message: "Certificate already generated"
        }
    }

    const data = {
        registrationNumber: institute.registrationNumber,
        instituteName: institute.centerName,
        instituteAddress: `${institute.centerAddress}, ${institute.centerCity}, ${institute.centerState} - ${institute.centerPincode}`,
        contactNo: institute.centerPhoneNumber,
        email: institute.centerEmailId,
    };

    const html = await ejs.renderFile(`./views/certificate.ejs`, data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
        printBackground: true,
    });

    const buffer = Buffer.from(pdfBuffer);

    await browser.close();

    await sftpService.connect();

    const remotePath = `/var/www/documents/institutes/${Date.now()}-${institute.registrationNumber}-certificate.pdf`;

    // Upload the image to VPS
    await sftpService.uploadFile(buffer, remotePath);
    await sftpService.disconnect();

    const certificateUrl = `http://${process.env.VPS_HOST}/uploads/institutes/${remotePath.split('/').pop()}`;

    await prisma.instituteDocument.create({
        data: {
            documentType: InstituteDocumentType.ACCREDITATION_CERTIFICATE,
            fileName: `${institute.registrationNumber}-certificate.pdf`,
            fileUrl: certificateUrl,
            instituteId: institute.id
        }
    });

    return {
        certificateUrl,
        message: "Certificate generated successfully"
    };
}