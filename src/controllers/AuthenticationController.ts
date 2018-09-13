import { Controller, Get, Res, QueryParam, CookieParam, Redirect, HttpError, BadRequestError, UseBefore } from 'routing-controllers'
import { Response } from 'express'

import { SCOPES } from 'index'
import { SpotifyService as Spotify } from 'services'
import { LocalParam } from 'utils'
import { setupAuthState, verifyAuthState } from 'middleware'

@Controller('/auth')
export class AuthenticationController {
    @Get('/login')
    @UseBefore(setupAuthState)
    @Redirect('') // redirect adress will always be overriden by controller method return value
    login(@LocalParam('state') state: string) {
        return Spotify.api.createAuthorizeURL(SCOPES, state)
    }

    @Get('/callback')
    @UseBefore(verifyAuthState)
    async callback(@QueryParam('code', { required: true }) code: string, @Res() res: Response) {
        try {
            const data = await Spotify.api.authorizationCodeGrant(code)

            const { access_token, refresh_token, expires_in } = data.body

            // do things with tokens, add new user and check if valid, starting appropiate SpotifyService method, which does does not exist yet

            return res.redirect('/')
        } catch (e) {
            // render some error page on token mismatch
            // render some other error page on code grant fail
            return `Error: ${e.message}`
        }
    }
}
