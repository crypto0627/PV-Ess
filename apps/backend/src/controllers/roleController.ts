import { Request, Response } from 'express'
import { RoleService } from '../services/roleService'

export class RoleController {
  private roleService = new RoleService()

  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await this.roleService.getAllRoles()
      res.json(roles)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }

  async getRoleById(req: Request, res: Response) {
    try {
      const role = await this.roleService.getRoleById(parseInt(req.params.id))
      if (!role) return res.status(404).json({ message: 'Role not found' })
      res.json(role)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }

  async createRole(req: Request, res: Response) {
    try {
      const role = await this.roleService.createRole(req.body.name)
      res.status(201).json(role)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const role = await this.roleService.updateRole(
        parseInt(req.params.id),
        req.body.name
      )
      res.json(role)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      await this.roleService.deleteRole(parseInt(req.params.id))
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
