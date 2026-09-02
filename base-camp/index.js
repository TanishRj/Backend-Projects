import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

let myusername = process.env.MY_USERNAME;

console.log(process.env.MY_USERNAME);

console.log("Start of New Backend Project - ");