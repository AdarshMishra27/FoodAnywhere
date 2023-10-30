import * as dotenv from 'dotenv'
import path from 'path'

const loc = path.join(__dirname, '../.env')
dotenv.config({ path: loc })

export const PORT = process.env.PORT
export const SECRET = process.env.JWT_SECRET_KEY
export const DB_PORT = process.env.DB_PORT
