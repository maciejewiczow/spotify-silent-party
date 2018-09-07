import session from 'express-session'

import { StorageService } from 'backend/services'

export const sessionMiddleware = session({
    store: StorageService.store,
    secret: process.env.SESSION_SECRET || 'ababab123*',
    saveUninitialized: false,
    name: process.env.SESSION_COOKIE_KEY || 'marhewka',
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: 'Lax'
    }
})
