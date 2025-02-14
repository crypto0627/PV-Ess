import { Request, Response } from 'express'
import { AuthService } from '../services/authService'
import { successResponse, errorResponse } from '../utils/response'

export class AuthController {
  private authService = new AuthService()

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

      successResponse(res, { user }) // 只回傳用戶資訊，不暴露 JWT
    } catch (error) {
      errorResponse(res, (error as Error).message)
    }
  }

  async logout(req: Request, res: Response) {
    try {
      // const token = req.header('Authorization')?.replace('Bearer ', '')
      const token = req.cookies.token
      if (!token) {
        return errorResponse(res, 'No token provided', 401)
      }

      await this.authService.logout(token)

      res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      successResponse(res, { message: 'Successfully signed out' })
    } catch (error) {
      errorResponse(res, (error as Error).message)
    }
  }
}
