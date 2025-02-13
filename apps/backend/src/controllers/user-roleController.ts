import { Request, Response } from 'express'
import { UserRoleService } from '../services/user-roleService'

export class UserRoleController {
  private userRoleService = new UserRoleService()

  async assignRoleToUser(req: Request, res: Response) {
    try {
      const userRole = await this.userRoleService.assignRoleToUser(
        parseInt(req.params.userId),
        parseInt(req.body.roleId)
      )
      res.status(201).json(userRole)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async removeRoleFromUser(req: Request, res: Response) {
    try {
      await this.userRoleService.removeRoleFromUser(
        parseInt(req.params.userId),
        parseInt(req.params.roleId)
      )
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
