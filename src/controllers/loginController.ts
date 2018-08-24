import { Request, Response } from 'express'
import uuid from 'uuid'

import { SCOPES, STATE_KEY } from 'backend/index'
import { SpotifyService as Spotify } from 'backend/services'

// GET /auth/login
export const loginController = (req: Request, res: Response) => {
    const state = uuid()
    res.cookie(STATE_KEY, state)

    res.redirect(Spotify.api.createAuthorizeURL(SCOPES, state))
}

// GET /auth/callback
export const callbackController = async (req: Request, res: Response) => {
    const { code = null, state = null } = req.query
    const storedState = req.cookies[STATE_KEY]

    try {
        if (state === null || state !== storedState) throw new Error('State mismatch!')

        res.clearCookie(STATE_KEY)

        const data = await Spotify.api.authorizationCodeGrant(code)

        const { access_token, refresh_token, expires_in } = data.body

        // do things with tokens
    } catch (e) {
        // render some error page on token mismatch
        // render some other error page on code grant fail
    }
}
