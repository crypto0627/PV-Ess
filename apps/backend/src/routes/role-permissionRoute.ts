import express, { Request, Response } from 'express'
import { RolePermissionController } from '../controllers/role-permissionController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()
const rolePermissionController = new RolePermissionController()

// 使用 async/await 處理異步控制器方法
router.post(
  '/:roleId/permissions',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      await rolePermissionController.assignPermissionToRole(req, res) // 等待異步處理完成
    } catch (error) {
      res.status(500).json({ message: (error as Error).message }) // 捕獲異常並返回錯誤信息
    }
  }
)

router.delete(
  '/:roleId/permissions/:permissionId',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      await rolePermissionController.removePermissionFromRole(req, res) // 等待異步處理完成
    } catch (error) {
      res.status(500).json({ message: (error as Error).message }) // 捕獲異常並返回錯誤信息
    }
  }
)

export default router
