import cors from 'cors';
import { RequestHandler } from 'express';

// Create CORS middleware with specific settings
const corsMiddleware: RequestHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
});

export default corsMiddleware;
