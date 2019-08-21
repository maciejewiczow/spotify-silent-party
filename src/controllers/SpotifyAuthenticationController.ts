import { Controller, Get, QueryParam, ForbiddenError } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import * as uuid from 'uuid';

import { Spotify } from 'services';
import { User } from 'models';
import { GRANT_CODE_TTL_MS, GrantCodeToken } from 'utils/apiModels';
import { SCOPES, JWT_SECRET } from 'index';
import { RequiredQueryParam } from 'utils/decorators';

@Controller('/auth/spotify')
export class SpotifyAuthenticationController {
    @Get('/url')
    url() {
        return Spotify.api.createAuthorizeURL(SCOPES, uuid());
    }

    @Get('/token')
    async token(@RequiredQueryParam('code') code: string) {
        const data = await Spotify.api.authorizationCodeGrant(code);

        const { access_token, refresh_token, expires_in } = data.body;

        const user = new User(access_token, refresh_token, expires_in);
        await user.loadData();

        if (!user.isValid()) throw new ForbiddenError('User is not suited to use this application');

        const grantCode: GrantCodeToken = {
            isGrantToken: true,
            userId: user.id || '',
            exp: Date.now() + GRANT_CODE_TTL_MS,
            iat: Date.now()
        };

        const encodedToken = jwt.sign(grantCode, JWT_SECRET);

        return {
            code: encodedToken,
            accessToken: access_token,
            epiresIn: expires_in
        };
    }
}
