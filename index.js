import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from 'dotenv';
dotenv.config();

import apiRouter from "./src/routes/index.js";
import initalizeDatabase from "./src/config/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

app.use(morgan('dev'));

app.use("/api", apiRouter);


async function startServer() {
    try {
        const connection = await initalizeDatabase();
        if (!connection) throw new Error("Database connection failed");
        console.log("Database connected successfully");
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server 😢 -->", error);
        process.exit(1);
    }
}

startServer();