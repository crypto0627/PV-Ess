import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity('password_reset_tokens')
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  reset_token!: string

  @Column()
  expires_at!: Date

  @Column()
  is_used!: boolean

  @ManyToOne(() => User, (user) => user.passwordResetTokens)
  user!: User
}
