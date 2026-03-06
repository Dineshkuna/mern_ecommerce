import express from 'express';
import errorHandleMiddleware from './middleware/error.js';
import user from './routes/userRoutes.js';
import product from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: "backend/config/config.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorHandleMiddleware);

export default app;