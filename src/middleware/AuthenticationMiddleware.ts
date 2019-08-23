import { BadRequestError, ForbiddenError, InternalServerError, UnauthorizedError } from 'routing-controllers';
import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { JWT_SECRET } from 'index';
import { StateToken } from 'models/api/tokens';

// state to compare with will be saved in redis

// for GET /auth/token
export function verifyStateToken({ query: { token = null } }: Request, res: Response, next: NextFunction) {
    if (token === null) throw new BadRequestError('No token provided');

    const rawToken = jwt.verify(token, JWT_SECRET, {}) as Partial<StateToken>;

    next();
}
