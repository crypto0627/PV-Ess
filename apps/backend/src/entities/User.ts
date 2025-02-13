import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { UserRole } from './UserRole'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  username!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles!: UserRole[]
}
