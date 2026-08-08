// Importing dotenv config to add variables from env file
import 'dotenv/config'
// Import dirzzle 
import dirzzle from 'drizzle-orm/node-postgres'

// Exporting db 
export const db = drizzle(process.env.DATABASE_URL);

// Exporting default db
export default db