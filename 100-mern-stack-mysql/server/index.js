import express from 'express'
import cors from 'cors'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PORT } from './config.js'

// Routes
import indexRoutes from './routes/index.routes.js'
import taskRoutes from './routes/tasks.routes.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

// Modules
app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
  }),
)

app.use(express.json())

// Routes
app.use(indexRoutes)
app.use(taskRoutes)

app.use(express.static(join(__dirname, '../client/dist')))

// Listen
app.listen(PORT)

console.log(`Server 'Nodejs' is listening on port ${PORT}!`)
