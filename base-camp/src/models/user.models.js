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
            url: ``,
            localPath: ""
        }
    }
})

// Exporting user schema to model so we can use it
export const User = mongoose.model("User", userSchema)