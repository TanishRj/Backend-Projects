// Importing db from index file of db
import {db} from '../db/index.js'
// Importing url table from url model 
import {urlsTable} from '../models/index.js'

export async function newUrlInsert(shortCode, url, userId) {
    const [result] = await db.insert(urlsTable).values({
        // Getting short code
        shortCode,
        // targetUrl
        targetURL: url,
        // user id
        userId
    }).returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetURL: urlsTable.targetURL
    })

    // Returning result
    return result
}