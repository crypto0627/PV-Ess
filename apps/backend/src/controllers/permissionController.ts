import { Request, Response } from 'express'
import { PermissionService } from '../services/permissionService'

export class PermissionController {
  private permissionService = new PermissionService()
  // 獲取所有權限
  async getAllPermissions(req: Request, res: Response) {
    try {
      const permissions = await this.permissionService.getAllPermissions()
      res.json(permissions)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }

  async getPermissionById(req: Request, res: Response) {
    try {
      const permission = await this.permissionService.getPermissionById(
        parseInt(req.params.id)
      )
      if (!permission)
        return res.status(404).json({ message: 'Permission not found' })
      res.json(permission)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }

  async createPermission(req: Request, res: Response) {
    try {
      const userId = parseInt(req.body.userId)
      const permissionName = req.body.name
      const result = await this.permissionService.createPermission(
        userId,
        permissionName
      )

      res.status(201).json({
        message: 'Permission created successfully',
        permission: result
      })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async updatePermission(req: Request, res: Response) {
    try {
      const userId = parseInt(req.body.userId)
      const permissionId = parseInt(req.params.id)
      const permissionName = req.body.name

      const result = await this.permissionService.updatePermission(
        userId,
        permissionId,
        permissionName
      )
      res.status(201).json({
        message: 'Permission updated successfully',
        permission: result
      })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async deletePermission(req: Request, res: Response) {
    try {
      const userId = parseInt(req.body.userId)
      const permissionId = parseInt(req.params.id)
      const permissionName = req.body.name
      const result = await this.permissionService.deletePermission(
        userId,
        permissionId,
        permissionName
      )

      res.status(201).json({
        message: 'Permission deleted successfully',
        permission: result
      })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
