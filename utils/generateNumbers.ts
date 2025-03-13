export const generateApplicationNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const time = date.getTime().toString().slice(-6); // Take last 6 digits

    return `SBCODL-${year}${month}${day}-${time}`;
};

export const generateEnrollmentNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const time = date.getTime().toString().slice(-6); // Take last 6 digits

    return `EN-${year}${month}${day}-${time}`;
};

export const generateRegistrationNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const time = date.getTime().toString().slice(-6); // Take last 6 digits

    return `RN-${year}${month}${day}-${time}`;
};

export const generateCenterCode = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const time = date.getTime().toString().slice(-6); // Take last 6 digits

    return `C-${year}${month}${day}-${time}`;
};