import express, { Request, Response } from 'express'
import { AuthController } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'
import { loginRateLimiter } from '../middleware/loginRateLimiter'
import * as jwt from 'jsonwebtoken'

const router = express.Router()
const authController = new AuthController()

router.post('/register', async (req: Request, res: Response) => {
  try {
    await authController.register(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.post('/login', loginRateLimiter, async (req: Request, res: Response) => {
  try {
    await authController.login(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    await authController.logout(req, res)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

router.get('/me', authMiddleware, async (req, res) => {
  res.json(req.body.userId)
})

export default router
