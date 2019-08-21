import { BadRequestError, ForbiddenError, InternalServerError, UnauthorizedError } from 'routing-controllers';
import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { JWT_SECRET } from 'index';
import { GrantCodeToken } from 'utils/apiModels';

// for GET /auth/callback
export function verifyAuthState(req: Request, res: Response, next: NextFunction) {
    // if (!req.session) throw new InternalServerError('Session not present!')

    const { state = null, code = null } = req.query;

    if (state === null) throw new BadRequestError('State not present!');
    if (code === null) throw new BadRequestError('Code not provided');

    // delete req.session.state

    next();
}

// for GET /auth/token
export function verifyAuthCode(req: Request, res: Response, next: NextFunction) {
    // if (!req.session) throw new InternalServerError('Session not present!')

    const { code = null } = req.query;
    const { code: storedCode = null } = {};

    if (storedCode === null) throw new BadRequestError('You need to start an authentication flow first');
    if (code === null) throw new BadRequestError('No code provided');
    if (code !== storedCode) throw new UnauthorizedError('Token mismatch');

    let decoded: GrantCodeToken;
    try {
        decoded = jwt.verify(code, JWT_SECRET) as GrantCodeToken;
    } catch (e) {
        throw new UnauthorizedError(`Invalid token: ${e.message}`);
    }

    if (!decoded.isGrantToken) throw new UnauthorizedError('Invalid token');

    // TODO: add checks for user id field

    // delete req.session.code
    next();
}
