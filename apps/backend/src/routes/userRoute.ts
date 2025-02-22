import express from 'express'
import { UserController } from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()
const userController = new UserController()

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
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
