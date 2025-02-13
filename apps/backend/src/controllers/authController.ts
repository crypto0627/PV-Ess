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
      const result = await this.authService.login(
        req.body.email,
        req.body.password
      )
      successResponse(res, result)
    } catch (error) {
      errorResponse(res, (error as Error).message)
    }
  }

  async signout(req: Request, res: Response) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '')
      if (!token) {
        return errorResponse(res, 'No token provided', 401)
      }

      await this.authService.signout(token)
      successResponse(res, { message: 'Successfully signed out' })
    } catch (error) {
      errorResponse(res, (error as Error).message)
    }
  }
}
