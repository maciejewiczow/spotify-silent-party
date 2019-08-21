import { Get, UseBefore, Controller } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';

import { verifyAuthCode } from 'middleware';
import { AccessToken, SESSION_TTL_MS } from 'utils/apiModels';
import { JWT_SECRET } from 'index';

@Controller('/auth')
export class AuthenticationController {
    @Get('/token')
    @UseBefore(verifyAuthCode)
    token() {
        const token: AccessToken = {
            accessLevel: 0,
            isAccessToken: true,
            userId: '',
            exp: Date.now() + SESSION_TTL_MS,
            iat: Date.now()
        };

        const encodedToken = jwt.sign(token, JWT_SECRET);

        return encodedToken;
    }
}
