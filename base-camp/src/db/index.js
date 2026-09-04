// Importing Mongoose
import mongoose from "mongoose";

// Creating a async method for db connection
const connectDB = async () => {
    try {
        // Connect mongodb using mongoose
        await mongoose.connect(process.env.MONGO_URI)
        // Log if connected
        console.log("MongoDB Connected ✅");
    } catch (error) {
        // Log if any error occurs
        console.error("  MongoDB Connection error ❌ ", error)
        // Exit process if any error occurs
        process.exit(1)
    }
}

// Exporting method
export default connectDB