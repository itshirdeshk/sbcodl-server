# Event Registration Backend API

## Overview
Created a complete backend API for event registration similar to the admission system, with payment integration and document upload functionality.

## Database Changes (schema.prisma)

### New Models Added:
1. **EventRegistration** - Main registration model with all user details and payment information
2. **EventRegistrationDocument** - For storing uploaded documents
3. **EventDocumentType** - Enum for different document types

### Updated Models:
- **Payment** - Added `eventRegistrationId` field and `EVENT_REGISTRATION` to PaymentType enum

## API Endpoints

Base URL: `/api/event-registration`

### Public Endpoints:
- `POST /register` - Create new event registration
- `POST /:id/upload-document` - Upload documents for registration

### Admin Endpoints (may need authentication middleware):
- `GET /list` - Get paginated list of registrations with filters
- `GET /:id` - Get registration by ID with documents and payments
- `PUT /:id` - Update registration details
- `DELETE /:id` - Delete registration (only if no successful payments)

## Features Implemented

### 1. Validation Files
- **CreateEventRegistration.ts** - Comprehensive validation for registration form
- **UpdateEventRegistration.ts** - Validation for updates
- **GetEventRegistrations.ts** - Query parameter validation with filters
- **GetEventRegistrationById.ts** - ID parameter validation
- **DeleteEventRegistration.ts** - Delete parameter validation

### 2. Controllers
- **CreateEventRegistration** - Handles registration creation with email confirmation
- **UpdateEventRegistration** - Updates registration with duplicate checks
- **GetEventRegistrationById** - Retrieves single registration with related data
- **GetEventRegistrations** - Paginated list with search and filters
- **DeleteEventRegistration** - Safe deletion with payment checks
- **UploadEventDocument** - Document upload with SFTP integration

### 3. Email Integration
- Created `eventRegistration.html` template for confirmation emails
- Automatic email sending on successful registration
- Professional HTML template with registration details

### 4. File Upload Support
- Added multer configuration for event documents
- Support for images (JPEG, JPG, PNG) and PDFs
- File size limit: 10MB
- SFTP integration for secure file storage

### 5. Payment Integration
- Payment status tracking
- Registration fees handling
- Integration with existing payment system

## Registration Flow

1. **User Registration**:
   - Fill out the comprehensive registration form
   - System validates all required fields
   - Generates unique registration number (EVENT-xxxxxxxx)
   - Creates registration with PENDING payment status
   - Sends confirmation email

2. **Document Upload** (Optional):
   - Upload required documents (Profile Picture, Aadhar, etc.)
   - Files stored securely via SFTP
   - Document metadata stored in database

3. **Payment Processing**:
   - Integration with existing PhonePe payment system
   - Payment status updates registration status
   - Confirmation email on successful payment

## Database Migration Required

You'll need to run the following to update your database:
```bash
npx prisma db push
# or
npx prisma migrate dev --name add-event-registration
```

## Environment Variables Required

Ensure these are set in your `.env`:
```
DATABASE_URL=your_database_url
EMAIL_FROM=noreply@sbcodl.com
# SFTP credentials for file uploads
# Email service credentials
```

## Testing the API

### 1. Create Registration
```bash
curl -X POST http://localhost:8080/api/event-registration/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "dateOfBirth": "1995-06-15",
    "gender": "MALE",
    "address": "123 Main Street, Sector 1",
    "city": "Delhi",
    "state": "Delhi",
    "pincode": "110001",
    "qualification": "Bachelor of Engineering",
    "instituteName": "XYZ University",
    "passingYear": "2018",
    "percentage": "85%",
    "selectedProgram": "Certificate in Distance Learning",
    "programMode": "Online",
    "preferredStartDate": "2025-09-01",
    "emergencyContactName": "Jane Doe",
    "emergencyContactPhone": "9876543211",
    "emergencyContactRelation": "Sister",
    "paymentAmount": 5000
  }'
```

### 2. Upload Document
```bash
curl -X POST http://localhost:8080/api/event-registration/{registration_id}/upload-document \
  -F "document=@/path/to/your/document.pdf" \
  -F "documentType=PROFILE_PICTURE"
```

### 3. Get All Registrations
```bash
curl "http://localhost:8080/api/event-registration/list?page=1&limit=10&search=john&paymentStatus=PENDING"
```

## Integration with Frontend

The frontend EventRegistration.tsx form is already structured to work with this backend. You'll need to:

1. Update form submission to call `/api/event-registration/register`
2. Add document upload functionality for each file type
3. Handle response messages and registration confirmation
4. Integrate payment flow with existing payment system

## Security Considerations

- Input validation on all endpoints
- File type and size restrictions
- Duplicate registration prevention
- Safe deletion (prevents deleting paid registrations)
- Proper error handling and logging

## Next Steps

1. Add authentication middleware for admin endpoints
2. Implement payment webhook integration
3. Add registration status management
4. Create admin dashboard for managing registrations
5. Add SMS notifications
6. Implement bulk operations for admin
