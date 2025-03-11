import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import AppDataSource from './data-source'
import authRoutes from './routes/authRoute'
import userRoutes from './routes/userRoute'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


AppDataSource.initialize()
  .then(() => console.log('✅ Database connected'))
  .catch((error: Error) => {
    console.error('❌ Error connecting to database:', error)
    process.exit(1)
  })

const apiPrefix = '/api'
app.use(`${apiPrefix}/auth`, authRoutes)
app.use(`${apiPrefix}/users`, userRoutes)

app.use((err: any, req: express.Request, res: express.Response) => {
  console.error('🔥 Error:', err)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {},
  })
})

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}/api`)
})
