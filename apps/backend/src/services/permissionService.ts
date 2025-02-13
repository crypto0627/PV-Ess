import AppDataSource from '../data-source'
import { Permission } from '../entities/Permission'
import { User } from '../entities/User'

export class PermissionService {
  private permissionRepository = AppDataSource.getRepository(Permission)
  private userRepository = AppDataSource.getRepository(User)

  async getAllPermissions() {
    return await this.permissionRepository.find()
  }

  async getPermissionById(id: number) {
    return await this.permissionRepository.findOneBy({ id })
  }

  async createPermission(userId: number, name: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user || user.id !== 1) {
      throw new Error('Forbidden: Only user with ID 1 can create permissions')
    }
    // Check if the permission name already exists
    const existingPermission = await this.permissionRepository.findOne({
      where: { name }
    })
    if (existingPermission) {
      throw new Error(`Permission '${name}' already exists`)
    }

    const permission = this.permissionRepository.create({ name })

    return await this.permissionRepository.save(permission)
  }

  async updatePermission(userId: number, id: number, name: string) {
    // Check if user ID is 1 (only admin can update permissions)
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user || user.id !== 1) {
      throw new Error('Forbidden: Only user with ID 1 can update permissions')
    }

    // Find the existing permission by ID
    const permission = await this.permissionRepository.findOneBy({ id })
    if (!permission) throw new Error('Permission not found')

    // Check if the new permission name already exists (prevent duplicates)
    const existingPermission = await this.permissionRepository.findOne({
      where: { name }
    })
    if (existingPermission && existingPermission.id !== id) {
      throw new Error(`Permission '${name}' already exists`)
    }

    // Update the permission name
    permission.name = name
    return await this.permissionRepository.save(permission)
  }

  async deletePermission(userId: number, id: number, name: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user || user.id !== 1) {
      throw new Error('Forbidden: Only user with ID 1 can create permissions')
    }
    // Check if the permission name already exists
    const existingPermission = await this.permissionRepository.findOne({
      where: { name }
    })
    if (existingPermission) {
      throw new Error(`Permission '${name}' already exists`)
    }
    const permission = await this.permissionRepository.findOneBy({ id })
    if (!permission) throw new Error('Permission not found')
    return await this.permissionRepository.remove(permission)
  }
}
