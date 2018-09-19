import * as session from 'express-session'
import { promisifyAll } from 'bluebird'
import { NextFunction, Request, Response } from 'express'

import { StorageService } from 'services'
import { SESSION_TTL_MS } from 'index'

export const sessionMiddleware = [
    session({
        store: StorageService.sessionStore,
        secret: process.env.SESSION_SECRET || 'ababab123*',
        saveUninitialized: true,
        name: process.env.SESSION_COOKIE_KEY || 'marhewka',
        resave: false,
        cookie: {
            httpOnly: true,
            maxAge: SESSION_TTL_MS,
            sameSite: 'Lax'
        }
    }),
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.session) {
            next()
            return
        }
        const promisifiedSession = promisifyAll(req.session)
        req.session = promisifiedSession

        next()
    }
]
