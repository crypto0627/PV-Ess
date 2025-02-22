import bcrypt from 'bcryptjs'
import AppDataSource from '../data-source'
import { User } from '../entities/User'

export class UserService {
  static updatePassword() {
    throw new Error('Method not implemented.')
  }
  private userRepository = AppDataSource.getRepository(User)

  async getAllUsers() {
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { id: 1 } })
    if (!user) throw new Error('User not found')

    // Only allow user with id = 1
    if (user.id !== 1)
      throw new Error('Forbidden: Only user with ID 1 can access this')

    // Fetch all users with relations (e.g., roles)
    return await this.userRepository.find({ relations: ['roles'] })
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['roles']
    })
  }

  async updateUser(id: number, username: string, email: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new Error('User not found')

    user.username = username || user.username
    user.email = email || user.email
    return await this.userRepository.save(user)
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new Error('User not found')
    return await this.userRepository.remove(user)
  }

  async updatePassword(id: number, oldPassword: string, newPassword: string) {
    // Find the user by ID
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new Error('User not found')

    // Compare the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) throw new Error('Old password is incorrect')

    // Ensure the new password is different from the old password
    if (oldPassword === newPassword)
      throw new Error('New password cannot be the same as old password')

    // Validate new password strength (at least 8 characters, one uppercase, one lowercase, one number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(newPassword)) {
      throw new Error(
        'New password must have at least 8 characters, including uppercase, lowercase, and a number'
      )
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword

    // Save the updated user password
    return await this.userRepository.save(user)
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }
}
