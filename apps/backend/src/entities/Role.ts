import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { UserRole } from './UserRole'
import { RolePermission } from './RolePermission'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  users!: UserRole[]

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  permissions!: RolePermission[]
}
