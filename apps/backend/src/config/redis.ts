import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: Number(process.env.REDIS_PORT) || 6379,
  connectTimeout: 5000, // 5 秒內無法連接就報錯
  retryStrategy: (times) => Math.min(times * 100, 3000) // 最多 3 秒重試一次
})

redisClient.on('connect', () => console.log('✅ Redis Connected'))
redisClient.on('error', (err) => console.error('❌ Redis Error:', err))

export { redisClient }
