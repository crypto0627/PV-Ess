import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { errorResponse } from '../utils/response'
import { redisClient } from '../config/redis'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token // 取得 HTTP-only cookie 的 token

  if (!token) {
    return errorResponse(res, 'No token provided', 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number
    }
    // 檢查 Token 是否在 Redis 黑名單中
    const isBlacklisted = await redisClient.get(`blacklist:${token}`)
    if (isBlacklisted) {
      return errorResponse(res, 'Token is blacklisted', 401)
    }
    req.body.userId = decoded.userId // 設置 userId

    console.log('Decoded JWT:', decoded) // 確認解碼結果
    next()
  } catch (err) {
    errorResponse(res, 'Invalid token', 401)
  }
}
