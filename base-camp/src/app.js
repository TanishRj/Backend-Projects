// Importing express
import express from "express"

// Import cors
import cors from "cors"

// Creating new app from express
const app = express()


// Middlewares 
app.use(express.json({limit: "16kb"})) // Anybody can send json data with limit
// Accepting URL encoded data
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// Static asset to be viewed publically
app.use(express.static("public"))

// Cors Configuration
app.use(cors({
    // Take origin value from env and split it from ',' , else take vite http
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    // Supported Method
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    // Headers config
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// Creating a GET request which sends some responds if requested 
app.get('/', (req, res) => {
// Sending server response as API Health OK
  res.send('API Health OK')
})

// Exporting app
export default app