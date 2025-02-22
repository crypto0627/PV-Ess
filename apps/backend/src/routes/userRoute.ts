import express from 'express'
import { UserController } from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()
const userController = new UserController()

// Need auth API
router.get('/', authMiddleware, async (req, res) => {
  try {
    await userController.getAllUsers(req, res)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    await userController.getUserById(req, res)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    await userController.updateUser(req, res)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await userController.deleteUser(req, res)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
