export const PrismaErrorCodeMapping = {
    P2000: "db-0001", // Value too long for column
    P2001: "db-0002", // Record not found
    P2002: "db-0003", // Unique constraint failed
    P2003: "db-0004", // Foreign key constraint failed
    P2004: "db-0005", // Invalid value provided
    P2005: "db-0006", // Required field is missing
    P2025: "db-0007", // Record not found for a required relation
    P2016: "db-0008", // Invalid JSON
    P2017: "db-0009", // Query interpretation failed
};

export const GeneralErrorCodes = {
    UNKNOWN: "unknown",
    AUTH_ERROR: "auth-error",
    CLIENT_ERROR: "invalid-input",
    TOO_MANY_REQUESTS: "too-many-request",
    UNAUTHORIZED: "unauthorized-access",
    FILE_NOT_FOUND: "file-not-found",
    PAYMENT_FAILED: "payment-failed",
    PAYMENT_PENDING: "payment-pending",
};

export const PrismaErrorMessageMapping = {
    P2000: "Value too long for colum", // Value too long for column
    P2001: "Record not found", // Record not found
    P2002: "Unique constraint failed", // Unique constraint failed
    P2003: "", // Foreign key constraint failed
    P2004: "Invalid value provided", // Invalid value provided
    P2005: "Required field is missing", // Required field is missing
    P2025: "Record not found",
    P2016: "", // Invalid JSON
    P2017: "", // Query interpretation failed
};