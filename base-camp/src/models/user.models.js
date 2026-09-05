// Importing mongoose and schema
import mongoose, { Schema } from "mongoose";

// Creating new userschema using Schema object to define fields
const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localPath: String
        },
        default: {
            url: ``,
            localPath: ""
        }
    }
})

// Exporting user schema to model so we can use it
export const User = mongoose.model("User", userSchema)