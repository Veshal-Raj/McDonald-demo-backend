import mongoose from "mongoose";

const initalizeDatabase = async function() {
    const DB_URL = process.env.DB_URL;
    if (!DB_URL) {
        throw new Error("No database URL provided. Please set the DB_URL environment variable.");
    }
    try {
        const connection = await mongoose.connect(DB_URL);
        return Boolean(connection);
    } catch (error) {
        throw new Error(`An error occurred while connecting to the database: ${error.message}`);
    }
}

export default initalizeDatabase;