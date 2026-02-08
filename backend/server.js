import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDatabase } from './config/db.js';
dotenv.config({path:"backend/config/config.env"});
import {v2 as cloudinary} from 'cloudinary';

connectMongoDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Handle uncaught Exception

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

const port = process.env.PORT || 3000;


const server = app.listen(port, ()=>{
    console.log(`Server is running on PORT  ${port}`);
})

// console.log(myName);


process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`); 
    server.close(() => {
        process.exit(1);
    });
})
