import { Controller, Get, QueryParam, Redirect, UseBefore, ForbiddenError } from 'routing-controllers'
import jwt from 'jwt-simple'

import { Spotify } from 'services'
import { setupAuthState, verifyAuthState, verifyAuthCode } from 'middleware'
import { SessionParam, SessionDec } from 'utils'

import { SCOPES, FRONT_ADDR, SESSION_TTL_MS, JWT_SECRET } from 'index'
import { GRANT_CODE_TTL_MS, GrantCodeToken, AccessToken } from 'models'
import { User } from 'models/User'

@Controller('/auth')
export class AuthenticationController {
    @Get('/login')
    @UseBefore(setupAuthState)
    login(@SessionParam('state', { required: true }) state: string) {
        return Spotify.api.createAuthorizeURL(SCOPES, state)
    }

    @Get('/callback')
    @UseBefore(verifyAuthState)
    @Redirect('') // will be overwritten with function return value
    // @TODO figure out how to get Session interface out of express-session module
    async callback(@QueryParam('code', { required: true }) code: string, @SessionDec() session: any) {
        const data = await Spotify.api.authorizationCodeGrant(code)

        const { access_token, refresh_token, expires_in } = data.body

        const user = new User(access_token, refresh_token, expires_in)
        await user.loadData()

        if (!user.isValid()) throw new ForbiddenError('User is not suited to use this application')

        session.regenerate()

        session.user = user

        const grantCode: GrantCodeToken = {
            isGrantToken: true,
            userId: user.id!,
            exp: Date.now() + GRANT_CODE_TTL_MS,
            iat: Date.now()
        }

        const encodedGrant = jwt.encode(grantCode, JWT_SECRET)

        session.code = encodedGrant

        return `${FRONT_ADDR}?code=${encodedGrant}`
    }

    @Get('/token')
    @UseBefore(verifyAuthCode)
    token(@SessionDec() session: any) {
        const token: AccessToken = {
            accessLevel: 0,
            isAccessToken: true,
            userId: session.user.id,
            exp: Date.now() + SESSION_TTL_MS,
            iat: Date.now()
        }

        const encodedToken = jwt.encode(token, JWT_SECRET)

        session.token = encodedToken
        delete session.code

        return encodedToken
    }
}
