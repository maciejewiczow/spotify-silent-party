import { Controller, Get, QueryParam, Redirect, UseBefore, ForbiddenError, Res } from 'routing-controllers'
import jwt from 'jwt-simple'
import { Response } from 'express'

import { Spotify } from 'services'
import { GRANT_CODE_TTL_MS, GrantCodeToken, AccessToken, User } from 'models'
import { setupAuthState, verifyAuthState, verifyAuthCode } from 'middleware'
import { SessionParam, SessionDec, SessionRequired } from 'utils'
import { SCOPES, FRONT_ADDR, SESSION_TTL_MS, JWT_SECRET } from 'index'

@Controller('/auth')
export class AuthenticationController {
    @Get('/login')
    @UseBefore(setupAuthState)
    login(@SessionParam('state', { required: true }) state: string, @Res() res: Response) {
        return res.redirect(Spotify.api.createAuthorizeURL(SCOPES, state))
    }

    @Get('/callback')
    @UseBefore(verifyAuthState)
    @Redirect('') // will be overwritten with function return value
    // @TODO figure out how to get Session interface out of express-session module
    async callback(@Res() res: Response, @SessionRequired() session: any, @QueryParam('error') error?: string, @QueryParam('code') code?: string) {
        if (error === 'access_denied' || !code) throw new ForbiddenError('User denied login request')

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

        const encodedGrant = jwt.encode(grantCode, JWT_SECRET)

        session.code = encodedGrant

        return res.redirect(`${FRONT_ADDR}?code=${encodedGrant}`)
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
