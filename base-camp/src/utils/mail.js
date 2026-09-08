// importing mailgen
import Mailgen from "mailgen";

// Creating mail sending method 



// Creating email verification email template which will take username and verification url
const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to Tanish's App, Let's get started",
            action: {
                instructions: "Verify your email by click the following button",
                button: {
                    color: "#015eea",
                    text: "Verify your email",
                    link: verificationUrl
                },
            },
            outro: "Have questions? Reply to this email"
        }
    }
}

// Creating forgot password email template which will take username and verification url
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account",
            action: {
                instructions: "To reset the password, click on the followig button or link",
                button: {
                    color: "#015eea",
                    text: "Reset Password",
                    link: passwordResetUrl
                },
            },
            outro: "Have questions? Reply to this email"
        }
    }
}

// Exporting both email templates
export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent
}