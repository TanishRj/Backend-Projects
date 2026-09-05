// Importing mongoose and schema
import mongoose, { Schema } from "mongoose";

// Creating new userschema using Schema object
const userSchema = new Schema({})

// Exporting user schema to model so we can use it
export const User = mongoose.model("User", userSchema)