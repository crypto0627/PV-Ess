import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AppDataSource from './data-source'

// 路由
import authRoutes from './routes/authRoute'
import userRoutes from './routes/userRoute'
import roleRoutes from './routes/roleRoute'
import permissionRoutes from './routes/permissonRoute'
import userRoleRoutes from './routes/user-roleRoute'
import rolePermissionRoutes from './routes/role-permissionRoute'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// 初始化資料庫連線
AppDataSource.initialize()
  .then(() => console.log('✅ Database connected'))
  .catch((error: Error) => {
    console.error('❌ Error connecting to database:', error)
    process.exit(1) // 強制終止應用程式
  })

// 設置 API 前綴，確保路由不會重疊
const apiPrefix = '/api'

app.use(`${apiPrefix}/auth`, authRoutes)
app.use(`${apiPrefix}/users`, userRoutes)
app.use(`${apiPrefix}/roles`, roleRoutes)
app.use(`${apiPrefix}/permissions`, permissionRoutes)
app.use(`${apiPrefix}/user-roles`, userRoleRoutes)
app.use(`${apiPrefix}/role-permissions`, rolePermissionRoutes)

// 錯誤處理 Middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('🔥 Error:', err)
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message })
  }
)

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/api`)
})
