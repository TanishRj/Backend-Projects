// Importing required modules
import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'

// Importing users table
import { usersTable } from './user.model.js'

export const urlsTable = pgTable('urls', {
    // Creating new id
    id: uuid().primaryKey().defaultRandom(),

    // Getting shortcode and url
    shortCode: varchar('code', {length: 155 }).notNull().unique(),
    targetURL: text('target_url').notNull(),

    // Getting userid based on user present in userstable
    userId: uuid('user_id').references(() => usersTable.id).notNull(),

    // Creating created and updated at using timestamp
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})