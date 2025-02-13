import express, { Request, Response } from 'express'
import { PermissionController } from '../controllers/permissionController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()
const permissionController = new PermissionController()

// 使用 async/await 包裝異步控制器方法
router.get('/', async (req: Request, res: Response) => {
  try {
    await permissionController.getAllPermissions(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await permissionController.getPermissionById(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    await permissionController.createPermission(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await permissionController.updatePermission(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await permissionController.deletePermission(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

export default router
