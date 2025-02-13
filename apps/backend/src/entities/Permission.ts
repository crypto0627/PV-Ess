import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { RolePermission } from './RolePermission'

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission
  )
  roles!: RolePermission[]
}
