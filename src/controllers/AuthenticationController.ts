import { Get, UseBefore, JsonController, ForbiddenError, InternalServerError } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';

import { JWT_SECRET, SCOPES } from 'index';
import { verifyStateToken } from 'middleware';
import { Spotify } from 'services';
import { User } from 'models';
import { AuthTokenReponse, AuthUrlResponse } from 'models/api/responses';
import { AccessToken, StateToken, STATE_TOKEN_TTL } from 'models/api/tokens';
import { RequiredQueryParam } from 'utils/decorators';

@JsonController('/auth')
export class AuthenticationController {
    @Get('/url')
    url(): AuthUrlResponse {
        const state = uuid();

        const rawStateToken: StateToken = {
            isStateToken: true,
            state
        };

        const token = jwt.sign(rawStateToken, JWT_SECRET, { expiresIn: STATE_TOKEN_TTL });

        return {
            url: Spotify.api.createAuthorizeURL(SCOPES, state),
            token,
            expiresIn: STATE_TOKEN_TTL
        };
    }

    @Get('/token')
    // @UseBefore(verifyStateToken)
    async token(@RequiredQueryParam('code') code: string): Promise<AuthTokenReponse> {
        try {
            const data = await Spotify.api.authorizationCodeGrant(code);
            const { access_token, refresh_token, expires_in: expiresIn } = data.body;

            const user = new User(access_token, refresh_token, expiresIn);
            await user.loadData();

            if (!user.isValid()) throw new ForbiddenError('User must be premium');
            await user.save();

            const rawAccessToken: AccessToken = {
                accessLevel: 0,
                isAccessToken: true,
                userId: user.id,
            };

            const token = jwt.sign(rawAccessToken, JWT_SECRET, { expiresIn });

            return {
                token,
                expiresIn
            };
        } catch (error) {
            if (error instanceof ForbiddenError) throw error;

            console.error(Object.getPrototypeOf(error), error.constructor.name, error);
            throw new InternalServerError('Endpoint error occurred');
        }

    }
}
