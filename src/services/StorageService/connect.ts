import * as session from 'express-session'
import * as createStore from 'connect-redis'
import * as redis from 'redis'

const SessionStorage = createStore(session)

export const store = redis.createClient({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '6968'),
    password: process.env.DB_PASS
})
export const sessionStore = new SessionStorage({ prefix: 'session-', logErrors: true, client: store })
