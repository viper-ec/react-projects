import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import indexRoutes from './routes/index.routes.js'
import taskRoutes from './routes/tasks.routes.js'

const app = express()

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

// Listen
app.listen(PORT)

console.log(`Server 'Nodejs' is listening on port ${PORT}!`)
