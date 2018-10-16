import { Controller, Get, QueryParam, UseBefore, ForbiddenError, Res, UnauthorizedError, Redirect, HttpCode } from 'routing-controllers'
import jwt from 'jsonwebtoken'
import { Response } from 'express'

import { Spotify } from 'services'
import { GRANT_CODE_TTL_MS, GrantCodeToken, AccessToken, User } from 'models'
import { setupAuthState, verifyAuthState, verifyAuthCode } from 'middleware'
import { SessionParam, SessionDec, SessionRequired, SessionParamRequired } from 'utils'
import { SCOPES, FRONT_ADDR, SESSION_TTL_MS, JWT_SECRET } from 'index'

@Controller('/auth')
export class AuthenticationController {
    @Get('/login')
    @UseBefore(setupAuthState)
    @Redirect('http://google.com') // will be overriden by function return val, same below
    login(@SessionParamRequired('state') state: string) {
        return Spotify.api.createAuthorizeURL(SCOPES, state)
    }

    @Get('/callback')
    @UseBefore(verifyAuthState)
    @Redirect('http://google.com')
    // @TODO figure out how to get Session interface out of express-session module
    async callback(@SessionRequired() session: any, @QueryParam('code') code: string) {
        const data = await Spotify.api.authorizationCodeGrant(code)

        const { access_token, refresh_token, expires_in } = data.body

        const user = new User(access_token, refresh_token, expires_in)
        await user.loadData()

        if (!user.isValid()) throw new ForbiddenError('User is not suited to use this application')

        await session.regenerateAsync()

        session.user = user

        const grantCode: GrantCodeToken = {
            isGrantToken: true,
            userId: user.id!,
            exp: Date.now() + GRANT_CODE_TTL_MS,
            iat: Date.now()
        }

        const encodedGrant = jwt.sign(grantCode, JWT_SECRET)

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

        const encodedToken = jwt.sign(token, JWT_SECRET)

        session.token = encodedToken

        return encodedToken
    }
}
