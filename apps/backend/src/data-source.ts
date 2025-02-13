import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { User } from './entities/User'
import { Permission } from './entities/Permission'
import { Role } from './entities/Role'
import { RolePermission } from './entities/RolePermission'
import { UserRole } from './entities/UserRole'

dotenv.config()

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_NAME || 'auth_db',
  entities: [User, Role, Permission, UserRole, RolePermission],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/migration/*.js']
      : ['src/migration/*.ts'],
  synchronize: true,
  logging: true
})
export default AppDataSource
