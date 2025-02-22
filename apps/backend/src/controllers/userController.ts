import { Request, Response } from 'express'
import { UserService } from '../services/userService'

export class UserController {
  private userService = new UserService()

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers()
      res.json(users)
    } catch (error) {
      res.status(403).json({ message: (error as Error).message }) // Use 403 Forbidden for unauthorized access
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(parseInt(req.params.id))
      if (!user) return res.status(404).json({ message: 'User not found' })
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
        req.body.email
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
