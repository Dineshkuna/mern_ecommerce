import express from 'express';
import errorHandleMiddleware from './middleware/error.js';
import user from './routes/userRoutes.js';
import product from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';
import order from './routes/orderRoutes.js';



const app = express();

// Middleware
app.use(express.json( ));
app.use(cookieParser());

// Routes

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1",order);


app.use(errorHandleMiddleware);
export default app;


