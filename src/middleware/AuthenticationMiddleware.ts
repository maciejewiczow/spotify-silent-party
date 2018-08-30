import { ExpressMiddlewareInterface, BadRequestError } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import uuid from 'uuid'

import { STATE_KEY } from 'index'

export class AuthLoginStateCreator implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction) {
        const state = uuid()

        res.locals.state = state
        res.cookie(STATE_KEY, state, { httpOnly: true, maxAge: 15 * 60 * 1000 }) // @TODO replace with Cookie.create(STATE_KEY, state)

        next()
    }
}

export class AuthStateVerifier implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction) {
        const { state = null } = req.query
        const storedState = req.cookies[STATE_KEY] || null

        if (state === null) throw new BadRequestError('State not present!')
        if (state !== storedState) throw new BadRequestError('State mismatch!')

        res.clearCookie(STATE_KEY) // @TODO replace with Cookie.clear(STATE_KEY)
        next()
    }
}
