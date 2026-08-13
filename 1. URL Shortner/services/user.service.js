// Importing eq from drizzle
import { eq } from 'drizzle-orm'
// Importing db from index file of db
import {db} from '../db/index.js'
// Importing users table from user model 
import {usersTable} from '../models/user.model.js'

// Function to check user by email
export async function getUserByEmail(email) {
    const [existingUser] = await db.select({
        // Selecting id of the user
        id: usersTable.id,
        firstname: usersTable.firstname,
        lastname: usersTable.lastname,
        email: usersTable.email,
        salt: usersTable.salt,
        password: usersTable.password,
    })
    .from(usersTable)
    // Checking if users email already exists
    .where(eq(usersTable.email, email))

    // Returns user if exists
    return existingUser
}

export async function insertNewUser(email, firstname, lastname, salt, hashedPassword) {
     // If user does not exists, inserting new one
    const [user] = await db.insert(usersTable).values({
        email,
        firstname,
        lastname,
        salt,
        password: hashedPassword,

        // Returning id of the user when inserted using returning
    }).returning({ id: usersTable.id })

    return user.id
}