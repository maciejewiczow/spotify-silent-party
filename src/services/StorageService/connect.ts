import * as redis from 'redis'
import * as dotenv from 'dotenv'
dotenv.config()
import { promisifyAll } from 'bluebird'

const store = redis.createClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6968'),
    password: process.env.REDIS_PASS
})
store.on('error', (err: any) => console.error('REDIS CLIENT ERROR', err))
store.on('connect', () => console.log('Redis client connected to server'))
store.on('ready', () => console.log(`Redis client ready`))

export const client = promisifyAll(store)
