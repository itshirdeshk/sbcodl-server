import cors from 'cors';
import { RequestHandler } from 'express';

const corsMiddleware: RequestHandler = cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Methods should be an array
    allowedHeaders: ["Content-Type", "Authorization"],      // Add commonly needed headers
    credentials: true,
    preflightContinue: true,                              // Handle OPTIONS preflight requests
    optionsSuccessStatus: 204                              // Standard OPTIONS success status
});

export default corsMiddleware;