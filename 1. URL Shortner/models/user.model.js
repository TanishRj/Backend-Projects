// Importing required modules
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

// Exporting usersTable which will create new table as 'users'
export const usersTable = pgTable('users',{
    id: uuid().primaryKey().defaultRandom(),
    // name: varchar({ length: 255 }).notNull(),
    // age: integer().notNull(),
    // email: varchar({ length: 255 }).notNull().unique(),
}) 