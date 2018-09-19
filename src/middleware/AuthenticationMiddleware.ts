import { BadRequestError, ForbiddenError, InternalServerError } from 'routing-controllers'
import { NextFunction, Response, Request } from 'express'
import * as uuid from 'uuid'
import jwt from 'jwt-simple'

import { JWT_SECRET } from 'index'
import { GrantCodeToken } from 'models'

// for GET /auth/login
export function setupAuthState(req: Request, res: Response, next: NextFunction) {
    if (!req.session) throw new InternalServerError('Session not present!')

    req.session.state = uuid()

    next()
}

// for GET /auth/callback
export function verifyAuthState(req: Request, res: Response, next: NextFunction) {
    if (!req.session) throw new InternalServerError('Session not present!')

    const { state = null } = req.query
    const { state: storedState = null } = req.session

    if (state === null) throw new BadRequestError('State not present!')
    if (state !== storedState) throw new BadRequestError('State mismatch!')

    delete req.session.state

    next()
}

// for GET /auth/token
export function verifyAuthCode(req: Request, res: Response, next: NextFunction) {
    if (!req.session) throw new InternalServerError('Session not present!')

    const { code = null } = req.query
    const { code: storedCode = null } = req.session

    const decoded: GrantCodeToken = jwt.decode(code, JWT_SECRET)

    if (storedCode === null) throw new BadRequestError('You need to start athentication flow first')
    if (code !== storedCode || Date.now() > decoded.exp || !decoded.isGrantToken) throw new ForbiddenError('Invalid token')

    // @TODO add checks for user id field

    next()
}
