import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  username!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date

  // 設置 created_at 和 updated_at 自動填充
  @BeforeInsert()
  setCreatedAt() {
    const currentDate = new Date()
    this.created_at = currentDate
    this.updated_at = currentDate
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updated_at = new Date()
  }
}
