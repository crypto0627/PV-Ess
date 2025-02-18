import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany
} from 'typeorm'
import { UserRole } from './UserRole'
import { Permission } from './Permission'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions!: Permission[]

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles!: UserRole[]
}
