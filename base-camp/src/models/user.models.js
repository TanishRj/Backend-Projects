// Importing mongoose and schema
import mongoose, { Schema } from "mongoose";

// Creating new userschema using Schema object to define fields
const userSchema = new Schema({
    // Storing avatar image url and local store path
    avatar: {
        type: {
            url: String,
            localPath: String
        },
        // if avatar not provided by user
        default: {
            url: `https://i0.wp.com/picjumbo.com/wp-content/uploads/sunset-wallpaper-free-image.jpeg`,
            localPath: ""
        }
    },
    
    // Storing Username with indexing as true
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    }

    // Storing Email
    
})

// Exporting user schema to model so we can use it
export const User = mongoose.model("User", userSchema)