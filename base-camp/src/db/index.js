// Importing Mongoose
import mongoose from "mongoose";

// Creating a async method for db connection
const connectDB = async () => {
    try {
        
    } catch (error) {
        // Log if any error occurs
        await mongoose.connect(process.env.MONGO_URI)
    }
}

// Exporting method
export default connectDB