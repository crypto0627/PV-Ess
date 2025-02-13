import { Request, Response } from 'express'
import { RolePermissionService } from '../services/role-permissionService'

export class RolePermissionController {
  private rolePermissionService = new RolePermissionService()

  async assignPermissionToRole(req: Request, res: Response) {
    try {
      const rolePermission =
        await this.rolePermissionService.assignPermissionToRole(
          parseInt(req.params.roleId),
          parseInt(req.body.permissionId)
        )
      res.status(201).json(rolePermission)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async removePermissionFromRole(req: Request, res: Response) {
    try {
      await this.rolePermissionService.removePermissionFromRole(
        parseInt(req.params.roleId),
        parseInt(req.params.permissionId)
      )
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
