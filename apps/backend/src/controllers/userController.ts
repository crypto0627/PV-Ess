import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserService } from '../services/userService'

export class UserController {
  private userService = new UserService()

  async getUserById(req: Request, res: Response) {
    try {
      const token = req.cookies.token
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: number
      }
      const user = await this.userService.getUserById(decoded.userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await this.userService.updateUser(
        parseInt(req.params.id),
        req.body.username,
        req.body.email,
      )
      res.json(user)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await this.userService.deleteUser(parseInt(req.params.id))
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
