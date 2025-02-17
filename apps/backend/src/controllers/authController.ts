import { Request, Response } from 'express'
import { AuthService } from '../services/authService'
import { successResponse, errorResponse } from '../utils/response'
import { UserService } from '../services/userService'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { redisClient } from '../config/redis'

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
      // 取得從 Cookie 中傳來的 JWT
      const token = req.cookies.token
      if (!token) {
        return res.status(400).json({ message: 'No token provided!' })
      }

      // 驗證 token 並解碼
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string
      }
      const userId = decoded.id

      // 在 Redis 中加入黑名單 (JWT token 與用戶 ID)
      await redisClient.setex(`blacklist_${token}`, 3600, userId) // 設定 1 小時過期時間

      // 清除 Cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 生產環境啟用 Secure
        sameSite: 'strict',
        path: '/'
      })

      res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Logout failed', error: (error as Error).message })
    }
  }
}
