import { createPool } from 'mysql2/promise'
import { DB_CONFIG } from './dbconfig.js'

export const pool = createPool({
  host: DB_CONFIG.host,
  port: DB_CONFIG.port,
  user: DB_CONFIG.user,
  password: DB_CONFIG.password,
  database: DB_CONFIG.database,
})
