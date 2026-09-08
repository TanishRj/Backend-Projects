// importing mailgen
import Mailgen from "mailgen";
// Importing nodemailer for sending email
import nodemailer from "nodemailer"

// Creating mail sending method 
const sendEmail = async (options) => {
    // Creating mail gen content for default branding
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager by Tanish",
            link: "https://taskmgr.com"
        }
    })

    // Generating mail based on some options provided (Does not supports HTML)
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    
    // Generating mail with supports HTML
    const emailHtml = mailGenerator.generate(options.mailgenContent)
    
    // Creating Mail transporter (SMTP Connection Establish) object
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    })

    // Email Information
    const mail = {
        from: "mail.taskmanager@example.com,",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    // Sending email
    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email Service Failed", error)
    }
}


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

// Exporting both email templates and send email
export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}