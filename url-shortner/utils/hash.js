import { randomBytes, createHmac } from "node:crypto"

export function hashPasswordWithSalt(password, userSalt = undefined){
    // Hashing password using crypto module
    const salt = userSalt ?? randomBytes(256).toString('hex')
    // Hashing password using generated salt
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')

    return {salt, password: hashedPassword}
}
