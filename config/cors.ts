import cors from 'cors';
import { RequestHandler } from 'express';

const corsMiddleware: RequestHandler = cors({
    origin: ["https://sbiea.co.in", "https://www.sbiea.co.in", "https://admin.sbiea.co.in", "https://institution.sbiea.co.in", "https://student.sbiea.co.in", "*"], // Allow requests from these origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Methods should be an array
    allowedHeaders: ["Content-Type", "Authorization"],      // Add commonly needed headers
    credentials: true,
    preflightContinue: true,                              // Handle OPTIONS preflight requests
    optionsSuccessStatus: 204                              // Standard OPTIONS success status
});

export default corsMiddleware;