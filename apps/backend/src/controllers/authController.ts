import { Request, Response } from 'express'
import { AuthService } from '../services/authService'
import { successResponse, errorResponse } from '../utils/response'
import { UserService } from '../services/userService'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class AuthController {
  private authService = new AuthService()
  private userService = new UserService()

  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(
        req.body.username,
        req.body.email,
        req.body.password
      )
      successResponse(res, user)
    } catch (error) {
      errorResponse(res, (error as Error).message)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { token, user } = await this.authService.login(
        req.body.email,
        req.body.password
      )

      // 設置 HttpOnly Cookie
      res.cookie('token', token, {
        httpOnly: true, // 防止 XSS 攻擊
        secure: true, // HTTPS 限制
        sameSite: 'strict', // 限制 CSRF 攻擊
        maxAge: 3600000 // 1 小時
      })

      res.status(200).json({ user })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async logout(req: Request, res: Response) {
    try {
      // 清除 HttpOnly Cookie
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 生產環境啟用 Secure
        sameSite: 'strict', // 防止 CSRF 攻擊
        expires: new Date(0) //立即過期
      })

      // 返回成功訊息
      res.status(200).json({ message: 'Logout successfully!' })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async getAuthStatus(req: Request, res: Response) {
    try {
      // 從 Cookie 解析 Token
      const token = req.cookies.jwt
      console.log(token)
      if (!token) return res.status(401).json({ message: 'Unauthorized' })

      // 驗證 Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

      // 確保 decoded 內包含 userId
      if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
        return res.status(401).json({ message: 'Invalid token structure' })
      }

      const user = await this.userService.getUserById(decoded.userId)
      if (!user) return res.status(404).json({ message: 'User not found' })

      res.json({ user })
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
  }
}
