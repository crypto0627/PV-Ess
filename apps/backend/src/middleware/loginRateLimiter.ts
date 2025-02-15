import { Request, Response, NextFunction } from 'express'

const failedLoginAttempts: Record<
  string,
  { count: number; lockUntil: number }
> = {}

export const loginRateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email } = req.body
  const currentTime = Date.now()

  if (!failedLoginAttempts[email]) {
    failedLoginAttempts[email] = { count: 0, lockUntil: 0 }
  }

  const { count, lockUntil } = failedLoginAttempts[email]

  // **如果帳號已被封鎖**
  if (lockUntil > currentTime) {
    const remainingTime = Math.ceil((lockUntil - currentTime) / 1000)
    res.status(429).json({ message: `請稍等 ${remainingTime} 秒後再嘗試` })
    return // **確保 middleware 不會繼續執行**
  }

  next() // **允許請求繼續進行**
}

// **登入失敗時增加錯誤計數**
export const recordFailedLogin = (email: string) => {
  if (!failedLoginAttempts[email]) {
    failedLoginAttempts[email] = { count: 0, lockUntil: 0 }
  }

  failedLoginAttempts[email].count++

  if (failedLoginAttempts[email].count >= 3) {
    failedLoginAttempts[email].lockUntil = Date.now() + 30 * 1000 // 鎖定 30 秒
  }
}

// **登入成功時清除記錄**
export const clearFailedLogin = (email: string) => {
  delete failedLoginAttempts[email]
}
