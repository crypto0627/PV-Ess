import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'
import { Role } from './Role'

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.userRoles)
  user!: User

  @ManyToOne(() => Role, (role) => role.userRoles)
  role!: Role
}
