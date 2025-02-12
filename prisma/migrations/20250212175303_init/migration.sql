-- CreateEnum
CREATE TYPE "StudentCategory" AS ENUM ('GENERAL', 'SC', 'ST', 'OBC', 'MINORITY', 'NRI', 'FOREIGN_NATIONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "Month" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

-- CreateEnum
CREATE TYPE "Year" AS ENUM ('Y2020', 'Y2021', 'Y2022', 'Y2023', 'Y2024', 'Y2025', 'Y2026', 'Y2027', 'Y2028', 'Y2029', 'Y2030');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ResultStatus" AS ENUM ('PASS', 'FAIL', 'PENDING', 'INCOMPLETE', 'WITHHELD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('A_PLUS', 'A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D', 'F');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('INDIA');

-- CreateEnum
CREATE TYPE "IndianState" AS ENUM ('ANDHRA_PRADESH', 'ARUNACHAL_PRADESH', 'ASSAM', 'BIHAR', 'CHHATTISGARH', 'GOA', 'GUJARAT', 'HARYANA', 'HIMACHAL_PRADESH', 'JHARKHAND', 'KARNATAKA', 'KERALA', 'MADHYA_PRADESH', 'MAHARASHTRA', 'MANIPUR', 'MEGHALAYA', 'MIZORAM', 'NAGALAND', 'ODISHA', 'PUNJAB', 'RAJASTHAN', 'SIKKIM', 'TAMIL_NADU', 'TELANGANA', 'TRIPURA', 'UTTAR_PRADESH', 'UTTARAKHAND', 'WEST_BENGAL');

-- CreateEnum
CREATE TYPE "UnionTerritory" AS ENUM ('ANDAMAN_NICOBAR', 'CHANDIGARH', 'DADRA_NAGAR_HAVELI', 'DAMAN_DIU', 'DELHI', 'JAMMU_KASHMIR', 'LADAKH', 'LAKSHADWEEP', 'PUDUCHERRY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'DECLINED', 'PROCESSING', 'REFUNDED', 'CANCELLED', 'TIMED_OUT', 'ERROR');

-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'FOLLOW_UP', 'CONVERTED', 'CLOSED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PROFILE_PHOTO', 'AADHAR_CARD_FRONT', 'AADHAR_CARD_BACK', 'MARKSHEET_10TH', 'MARKSHEET_12TH', 'TRANSFER_CERTIFICATE', 'BIRTH_CERTIFICATE', 'INCOME_CERTIFICATE', 'CASTE_CERTIFICATE', 'PASSPORT', 'OTHER');

-- CreateEnum
CREATE TYPE "InstituteDocumentType" AS ENUM ('HEAD_AADHAR_CARD_FRONT', 'HEAD_AADHAR_CARD_BACK', 'HEAD_PAN_CARD', 'REGISTRATION_CERTIFICATE', 'AFFILIATION_DOCUMENT', 'TAX_DOCUMENT', 'LOGO', 'INFRASTRUCTURE_PLAN', 'ACADEMIC_CALENDAR', 'FACULTY_CREDENTIALS', 'ACCREDITATION_CERTIFICATE', 'LAND_DOCUMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('ACADEMIC', 'DIPLOMA', 'CERTIFICATE', 'DEGREE', 'POST_GRADUATE', 'PHD');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('LANGUAGE', 'NON_LANGUAGE', 'VOCATIONAL');

-- CreateEnum
CREATE TYPE "ExaminationType" AS ENUM ('X', 'XII', 'OTHER');

-- CreateEnum
CREATE TYPE "AdmissionType" AS ENUM ('FRESH', 'TOC', 'PART_ADMISSION');

-- CreateEnum
CREATE TYPE "BatchType" AS ENUM ('BATCH_1_2024_O_24', 'BATCH_2_2024_M_25');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('STUDENT', 'INSTITUTE');

-- CreateEnum
CREATE TYPE "PaymentInstrumentType" AS ENUM ('UPI', 'NETBANKING', 'CARD');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "admissionType" "AdmissionType" NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "category" "StudentCategory" NOT NULL,
    "gender" "Gender" NOT NULL,
    "nationality" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "batch" "BatchType" NOT NULL,
    "studentPhoto" TEXT,
    "subjectIds" TEXT[],
    "applicationNumber" TEXT NOT NULL,
    "enrollmentNumber" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instituteId" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationalQualification" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "examination" "ExaminationType" NOT NULL,
    "subjects" TEXT NOT NULL,
    "board" TEXT,
    "university" TEXT,
    "yearOfPassing" TEXT NOT NULL,
    "division" TEXT,
    "grade" TEXT,
    "percentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationalQualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastPassedExam" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subjectType" "SubjectType" NOT NULL,
    "subject" TEXT NOT NULL,
    "practicalMarks" DOUBLE PRECISION NOT NULL,
    "assignmentMarks" DOUBLE PRECISION NOT NULL,
    "theoryMarks" DOUBLE PRECISION NOT NULL,
    "obtainedMarks" DOUBLE PRECISION NOT NULL,
    "maximumMarks" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LastPassedExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermanentAddress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" "IndianState",
    "country" "Country" NOT NULL DEFAULT 'INDIA',
    "pincode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermanentAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorrespondenceAddress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" "IndianState",
    "country" "Country" NOT NULL DEFAULT 'INDIA',
    "pincode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CorrespondenceAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentDocument" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institute" (
    "id" TEXT NOT NULL,
    "applicationNumber" TEXT,
    "registrationNumber" TEXT,
    "headDob" TEXT NOT NULL,
    "headName" TEXT NOT NULL,
    "headFatherName" TEXT NOT NULL,
    "headAadharNumber" TEXT NOT NULL,
    "headPanCardNumber" TEXT NOT NULL,
    "headMobileNumber" TEXT NOT NULL,
    "headEmailId" TEXT NOT NULL,
    "headProfileImage" TEXT,
    "headGender" "Gender" NOT NULL,
    "headAddress" TEXT NOT NULL,
    "headCity" TEXT NOT NULL,
    "headState" "IndianState",
    "headUnionTerritory" "UnionTerritory",
    "headCountry" "Country" NOT NULL DEFAULT 'INDIA',
    "headPincode" TEXT NOT NULL,
    "headBankName" TEXT NOT NULL,
    "headAccountNumber" TEXT NOT NULL,
    "headIfscCode" TEXT NOT NULL,
    "centerCode" TEXT,
    "centerName" TEXT NOT NULL,
    "centerEmailId" TEXT NOT NULL,
    "centerWebsiteUrl" TEXT,
    "centerPhoneNumber" TEXT NOT NULL,
    "centerAddress" TEXT NOT NULL,
    "centerCity" TEXT NOT NULL,
    "centerState" "IndianState",
    "centerUnionTerritory" "UnionTerritory",
    "centerCountry" "Country" NOT NULL DEFAULT 'INDIA',
    "centerPincode" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstituteDocument" (
    "id" TEXT NOT NULL,
    "instituteId" TEXT NOT NULL,
    "documentType" "InstituteDocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstituteDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "merchantTransactionId" TEXT NOT NULL,
    "phonePeTransactionId" TEXT,
    "merchantId" TEXT NOT NULL,
    "merchantUserId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "studentId" TEXT,
    "instituteId" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentInstrumentType" "PaymentInstrumentType",
    "utr" TEXT,
    "cardType" TEXT,
    "pgTransactionId" TEXT,
    "bankTransactionId" TEXT,
    "pgAuthorizationCode" TEXT,
    "arn" TEXT,
    "bankId" TEXT,
    "brn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "forInstitute" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "fees" DOUBLE PRECISION,
    "courseType" "CourseType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "fees" DOUBLE PRECISION,
    "type" "SubjectType" NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectResultDetail" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalMarks" DOUBLE PRECISION NOT NULL,
    "obtainedMarks" DOUBLE PRECISION NOT NULL,
    "grade" "Grade" NOT NULL,
    "status" "ResultStatus" NOT NULL,
    "resultId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubjectResultDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "month" "Month" NOT NULL,
    "year" "Year" NOT NULL,
    "totalMarks" DOUBLE PRECISION NOT NULL,
    "obtainedMarks" DOUBLE PRECISION NOT NULL,
    "status" "ResultStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_applicationNumber_key" ON "Student"("applicationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_enrollmentNumber_key" ON "Student"("enrollmentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phoneNumber_key" ON "Student"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_applicationNumber_key" ON "Institute"("applicationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_registrationNumber_key" ON "Institute"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_headAadharNumber_key" ON "Institute"("headAadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_headPanCardNumber_key" ON "Institute"("headPanCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_headAccountNumber_key" ON "Institute"("headAccountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_merchantTransactionId_key" ON "Payment"("merchantTransactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_phonePeTransactionId_key" ON "Payment"("phonePeTransactionId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationalQualification" ADD CONSTRAINT "EducationalQualification_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastPassedExam" ADD CONSTRAINT "LastPassedExam_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermanentAddress" ADD CONSTRAINT "PermanentAddress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrespondenceAddress" ADD CONSTRAINT "CorrespondenceAddress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDocument" ADD CONSTRAINT "StudentDocument_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstituteDocument" ADD CONSTRAINT "InstituteDocument_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectResultDetail" ADD CONSTRAINT "SubjectResultDetail_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
