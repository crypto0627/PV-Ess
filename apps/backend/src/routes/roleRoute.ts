import express, { Request, Response } from 'express'
import { RoleController } from '../controllers/roleController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()
const roleController = new RoleController()

router.get('/', async (req: Request, res: Response) => {
  try {
    await roleController.getAllRoles(req, res) // 確保異步執行
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await roleController.getRoleById(req, res) // 確保異步執行
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    await roleController.createRole(req, res) // 確保異步執行
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await roleController.updateRole(req, res) // 確保異步執行
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await roleController.deleteRole(req, res) // 確保異步執行
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

export default router
