import session from 'express-session'
import createStore from 'connect-redis'
import redis from 'redis'

const SessionStorage = createStore(session)

export const store = redis.createClient()
export const sessionStore = new SessionStorage({ prefix: 'session-', logErrors: true })
