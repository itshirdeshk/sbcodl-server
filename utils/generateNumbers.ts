export const generateApplicationNumber = () => {
    // Generate a 10-digit unique application number
    const min = 1000000000; // Minimum 10-digit number
    const max = 9999999999; // Maximum 10-digit number

    // Use current timestamp to ensure uniqueness
    const timestamp = new Date().getTime();

    // Combine random number with timestamp and take last 10 digits
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const uniqueNum = (randomNum + timestamp).toString().slice(-10);

    return `SBCODL-${uniqueNum.padStart(10, '0')}`;
};

export const generateEnrollmentNumber = () => {
    // Generate a random 10-digit number
    const min = 1000000000; // Minimum 10-digit number
    const max = 9999999999; // Maximum 10-digit number

    // Use current timestamp to ensure uniqueness
    const timestamp = new Date().getTime();

    // Combine random number with timestamp and take last 10 digits
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const uniqueNum = (randomNum + timestamp).toString().slice(-10);

    return uniqueNum.padStart(10, '0');
};

export const generateRegistrationNumber = () => {
    // Generate a random 10-digit number
    const min = 1000000000; // Minimum 10-digit number
    const max = 9999999999; // Maximum 10-digit number

    // Use current timestamp to ensure uniqueness
    const timestamp = new Date().getTime();

    // Combine random number with timestamp and take last 10 digits
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const uniqueNum = (randomNum + timestamp).toString().slice(-10);

    return `${uniqueNum.padStart(10, '0')}`;
};

export const generateCenterCode = () => {
    // Generate a random 8-digit number
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number

    // Use current timestamp to ensure uniqueness
    const timestamp = new Date().getTime();

    // Combine random number with timestamp and take last 8 digits
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const uniqueCode = (randomNum + timestamp).toString().slice(-8);

    return `C-${uniqueCode.padStart(8, '0')}`;
};