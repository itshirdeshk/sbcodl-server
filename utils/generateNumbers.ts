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
    // Generate a random 6-digit number
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number

    // Use current timestamp to ensure uniqueness
    const timestamp = new Date().getTime();

    // Combine random number with timestamp and take last 6 digits
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const uniqueCode = (randomNum + timestamp).toString().slice(-6);

    return `C-${uniqueCode.padStart(6, '0')}`;
};