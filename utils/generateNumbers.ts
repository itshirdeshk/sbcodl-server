export const generateApplicationNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const time = date.getTime().toString().slice(-6); // Take last 6 digits

    return `SB-${year}${month}${day}-${time}`;
};

export const generateEnrollmentNumber = () => {
    // Generate a random 8-digit number
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number
    
    // Use current timestamp to ensure uniqueness
    const timestamp = new Date().getTime();
    
    // Combine random number with timestamp and take last 8 digits
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const uniqueNum = (randomNum + timestamp).toString().slice(-8);
    
    return uniqueNum.padStart(8, '0');
};

export const generateRegistrationNumber = () => {
    // Generate a random 8-digit number
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number
    
    // Use current timestamp to ensure uniqueness
    const timestamp = new Date().getTime();
    
    // Combine random number with timestamp and take last 8 digits
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const uniqueNum = (randomNum + timestamp).toString().slice(-8);
    
    return `${uniqueNum.padStart(8, '0')}`;
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