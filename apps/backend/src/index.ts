import express from 'express'
import cors from 'cors'
import AppDataSource from './data-source'
import authRoutes from './routes/authRoute'
import userRoutes from './routes/userRoute'
import roleRoutes from './routes/roleRoute'
import permissionRoutes from './routes/permissonRoute'
import userRoleRoutes from './routes/user-roleRoute'
import rolePermissionRoutes from './routes/role-permissionRoute'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// 初始化資料庫連線
AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((error: Error) => console.log('Error connecting to database:', error))

// 路由設置
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/roles', roleRoutes)
app.use('/permissions', permissionRoutes)
app.use('/users', userRoleRoutes)
app.use('/roles', rolePermissionRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
