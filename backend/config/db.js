import mongoose from "mongoose";
import dns from "dns";

export const connectMongoDatabase = () => {
    // Some Windows environments (or local DNS proxies) can return 127.0.0.1 as a resolver,
    // which may reject SRV queries used by mongodb+srv URIs.
    // For MongoDB Atlas, ensure Node uses a public resolver that supports SRV.
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    mongoose.connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    }).then((data)=> {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err) => {
        console.log(`Database connection error: ${err.message}`);
        console.log('Troubleshooting steps:');
        console.log('1. Check your internet connection');
        console.log('2. Verify MongoDB Atlas cluster is running (not paused)');
        console.log('3. Check IP whitelist in MongoDB Atlas (allow access from anywhere: 0.0.0.0/0)');
        console.log('4. Verify username and password in connection string');
        console.log('5. Try connecting with MongoDB Compass using the same connection string');
        process.exit(1);
    });
}


