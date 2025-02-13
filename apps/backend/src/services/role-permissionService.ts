import AppDataSource from '../data-source'
import { RolePermission } from '../entities/RolePermission'
import { Role } from '../entities/Role'
import { Permission } from '../entities/Permission'

export class RolePermissionService {
  private rolePermissionRepository = AppDataSource.getRepository(RolePermission)
  private roleRepository = AppDataSource.getRepository(Role)
  private permissionRepository = AppDataSource.getRepository(Permission)

  async assignPermissionToRole(roleId: number, permissionId: number) {
    const role = await this.roleRepository.findOneBy({ id: roleId })
    const permission = await this.permissionRepository.findOneBy({
      id: permissionId
    })
    if (!role || !permission) throw new Error('Role or Permission not found')

    const rolePermission = this.rolePermissionRepository.create({
      role,
      permission
    })
    return await this.rolePermissionRepository.save(rolePermission)
  }

  async removePermissionFromRole(roleId: number, permissionId: number) {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: { role: { id: roleId }, permission: { id: permissionId } }
    })
    if (!rolePermission) throw new Error('RolePermission not found')
    return await this.rolePermissionRepository.remove(rolePermission)
  }
}
