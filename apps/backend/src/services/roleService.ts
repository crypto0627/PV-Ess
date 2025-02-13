import AppDataSource from '../data-source'
import { Role } from '../entities/Role'

export class RoleService {
  private roleRepository = AppDataSource.getRepository(Role)

  async getAllRoles() {
    return await this.roleRepository.find()
  }

  async getRoleById(id: number) {
    return await this.roleRepository.findOneBy({ id })
  }

  async createRole(name: string) {
    const role = this.roleRepository.create({ name })
    return await this.roleRepository.save(role)
  }

  async updateRole(id: number, name: string) {
    const role = await this.roleRepository.findOneBy({ id })
    if (!role) throw new Error('Role not found')
    role.name = name
    return await this.roleRepository.save(role)
  }

  async deleteRole(id: number) {
    const role = await this.roleRepository.findOneBy({ id })
    if (!role) throw new Error('Role not found')
    return await this.roleRepository.remove(role)
  }
}
