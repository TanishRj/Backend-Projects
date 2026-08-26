// Importing required modules
import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'

// Exporting usersTable which will create new table as 'users'
export const usersTable = pgTable('users',{
    // id, always unique to each user
    id: uuid().primaryKey().defaultRandom(),
    
    // Giving different field name (first_name) for database
    firstname: varchar('first_name',{ length: 55 }).notNull(),
    lastname: varchar('last_name',{ length: 55 }),
    
    // Email field
    email: varchar({ length: 255 }).notNull().unique(),
    
    // Passwor and its salt field
    password: text().notNull(),
    salt: text().notNull(),

    // Creating created and updated at using timestamp
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),

}) 