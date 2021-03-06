import * as session from 'express-session'
import * as createStore from 'connect-redis'
import * as redis from 'redis'
import * as dotenv from 'dotenv'
dotenv.config()
import { promisifyAll } from 'bluebird'

const SessionStorage = createStore(session)

const store = redis.createClient({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '6968'),
    password: process.env.DB_PASS
})
store.on('error', (err: any) => console.error('REDIS CLIENT ERROR', err))
store.on('connect', () => console.log('Redis client connected to server'))
store.on('ready', () => console.log(`Redis client ready`))

export const client = promisifyAll(store)
export const sessionStore = new SessionStorage({
    prefix: 'session-',
    logErrors: true,
    client: store
})
