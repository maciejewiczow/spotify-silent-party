import session from 'express-session'
import createStore from 'connect-redis'

const SessionStorage = createStore(session)

export const store = new SessionStorage({ prefix: 'session-', logErrors: true })
