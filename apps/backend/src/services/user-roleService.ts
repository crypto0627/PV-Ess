import AppDataSource from '../data-source'
import { UserRole } from '../entities/UserRole'
import { User } from '../entities/User'
import { Role } from '../entities/Role'

export class UserRoleService {
  private userRoleRepository = AppDataSource.getRepository(UserRole)
  private userRepository = AppDataSource.getRepository(User)
  private roleRepository = AppDataSource.getRepository(Role)

  async assignRoleToUser(userId: number, roleId: number) {
    const user = await this.userRepository.findOneBy({ id: userId })
    const role = await this.roleRepository.findOneBy({ id: roleId })
    if (!user || !role) throw new Error('User or Role not found')

    const userRole = this.userRoleRepository.create({ user, role })
    return await this.userRoleRepository.save(userRole)
  }

  async removeRoleFromUser(userId: number, roleId: number) {
    const userRole = await this.userRoleRepository.findOne({
      where: { user: { id: userId }, role: { id: roleId } }
    })
    if (!userRole) throw new Error('UserRole not found')
    return await this.userRoleRepository.remove(userRole)
  }
}
