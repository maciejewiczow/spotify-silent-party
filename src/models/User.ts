import { Spotify } from 'services'
import { UserObjectPrivate, CurrentlyPlayingResponse } from 'spotify-api-response-schemas'
import { ApiResponse } from 'spotify-web-api-node'
import uuid from 'uuid'

export class User {
    private _id?: string
    private _accessToken: string
    private _refreshToken: string
    private _tokenExpiration: number

    private data?: UserObjectPrivate
    private playback?: ApiResponse<CurrentlyPlayingResponse>

    constructor(accessToken: string, refreshToken: string, tokenExpiration: number) {
        this._accessToken = accessToken
        this._refreshToken = refreshToken
        this._tokenExpiration = tokenExpiration
    }

    get id() {
        return this._id
    }

    get accessToken() {
        return this._accessToken
    }

    get refreshToken() {
        return this._refreshToken
    }

    get tokenExpiration() {
        return this._tokenExpiration
    }

    isTokenExpired(): boolean {
        return Date.now() > this._tokenExpiration
    }

    async loadData() {
        Spotify.use(this._accessToken)
        const [user, playerStatus] = await Promise.all([Spotify.api.getMe(), Spotify.api.getMyCurrentPlayingTrack()])

        this._id = user.body.id
        this.data = user.body
        this.playback = playerStatus
    }

    isValid(): boolean {
        if (!this.data || !this.playback) return false

        const isPremium = this.data.product === 'premium'
        const isPrivateMode = this.playback.statusCode !== 200 && JSON.stringify(this.playback.body) !== JSON.stringify({})

        return isPremium && !isPrivateMode
    }
}
