/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import AppDataSource from './data-source'

// 路由
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoute'
import userRoutes from './routes/userRoute'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// CORS 配置
app.use(
  cors({
    origin: true,
    credentials: true, // 允許攜帶認證資訊
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允許的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // 允許的請求標頭
  })
)

// 中間件
app.use(express.json()) // 解析 JSON 請求體
app.use(express.urlencoded({ extended: true })) // 解析 URL 編碼的請求體
app.use(cookieParser()) // 解析 Cookie

// 初始化資料庫連線
AppDataSource.initialize()
  .then(() => console.log('✅ Database connected'))
  .catch((error: Error) => {
    console.error('❌ Error connecting to database:', error)
    process.exit(1)
  })

// API 路由
const apiPrefix = '/api'
app.use(`${apiPrefix}/auth`, authRoutes)
app.use(`${apiPrefix}/users`, userRoutes)

// 全局錯誤處理
app.use((err: any, req: express.Request, res: express.Response) => {
  console.error('🔥 Error:', err)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
})

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/api`)
})
