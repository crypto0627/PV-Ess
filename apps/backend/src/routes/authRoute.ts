import express, { Request, Response } from 'express'
import { AuthController } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()
const authController = new AuthController()

// 使用 async/await 包裝異步處理方法
router.post('/register', async (req: Request, res: Response) => {
  try {
    await authController.register(req, res) // 等待異步處理完成
  } catch (error) {
    res.status(500).json({ message: (error as Error).message }) // 捕獲異常並返回錯誤信息
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    await authController.login(req, res) // 等待異步處理完成
  } catch (error) {
    res.status(500).json({ message: (error as Error).message }) // 捕獲異常並返回錯誤信息
  }
})

router.post('/signout', authMiddleware, async (req, res) => {
  try {
    await authController.signout(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

export default router
