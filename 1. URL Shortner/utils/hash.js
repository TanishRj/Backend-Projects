import { randomBytes, createHmac } from "node:crypto"


// Hashing password using crypto module

const salt = randomBytes(256).toString('hex')

// Hashing password using generated salt

const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
