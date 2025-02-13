import express, { Request, Response } from 'express'
import { UserRoleController } from '../controllers/user-roleController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()
const userRoleController = new UserRoleController()

// 使用 async/await 包裝異步控制器方法
router.post(
  '/:userId/roles',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      await userRoleController.assignRoleToUser(req, res) // 等待異步處理完成
    } catch (error) {
      res.status(500).json({ message: (error as Error).message }) // 捕獲異常並返回錯誤信息
    }
  }
)

router.delete(
  '/:userId/roles/:roleId',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      await userRoleController.removeRoleFromUser(req, res) // 等待異步處理完成
    } catch (error) {
      res.status(500).json({ message: (error as Error).message }) // 捕獲異常並返回錯誤信息
    }
  }
)

export default router
