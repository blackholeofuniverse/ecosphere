import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI

const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI)
        console.log(`MongoDB connected: ${connection.connection.name}`);
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

export default connectToDB;