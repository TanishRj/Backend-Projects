// Importing mongoose and schema
import mongoose, { Schema } from "mongoose";

// Importing bcrypt
import bcrypt from "bcrypt"

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
    },

    // Storing Email
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Storing full name
    fullName: {
        type: String,
        trim: true
    },

    // Storing Password
    password: {
        type: String,
        required: [true, "Password is required"],
    },

    // Checking if email is verified or not
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    
    // Storing refresh Token
    refreshToken: {
        type: String
    },

    // Forgot Password Token
    forgotPasswordToken: {
        type: String
    },

    // Forgot Password Expiry
    forgotPasswordExpiry: {
        type: Date
    },

    // Email verification token
    emailVerificationToken: {
        type: String
    },

    // Email verification expiry
    emailVerificationExpiry: {
        type: Date
    },
}, {
    timestamps: true
},
)

// Hashing password
// Method before exporting using pre hook when save operation is performed
userSchema.pre("save", async function(next){
    // Running hashing only if password field is modified (saving 1st time and changing password)
    if(!this.isModified("password")) return next()
    // Hashing with 10 rounds and overwriting existing password
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// New method to check if user and stored password hashes are same
userSchema.methods.isPasswordCorrect = async function (password) {
    // Comparing given and store password using compare also returning the same
    return await bcrypt.compare(password, this.password)
}

// Exporting user schema to model so we can use it
export const User = mongoose.model("User", userSchema)