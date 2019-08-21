import { Spotify } from 'services';
import { UserObjectPrivate } from 'spotify-api';
import SpotifyWebApi from 'spotify-web-api-node';

export class User {
    private _id?: string

    // FIXME: this is just temporary solution to cache data
    private data?: UserObjectPrivate
    private playback?: PromiseValueT<ReturnType<SpotifyWebApi['getMyCurrentPlayingTrack']>>

    constructor(private _accessToken: string, private _refreshToken: string, private _tokenExpiration: number) { }

    get id() {
        return this._id;
    }

    get accessToken() {
        return this._accessToken;
    }

    get refreshToken() {
        return this._refreshToken;
    }

    get tokenExpiration() {
        return this._tokenExpiration;
    }

    isTokenExpired(): boolean {
        return Date.now() > this._tokenExpiration;
    }

    async loadData() {
        Spotify.use(this._accessToken);
        const [user, playerStatus] = await Promise.all([Spotify.api.getMe(), Spotify.api.getMyCurrentPlayingTrack()]);

        this._id = user.body.id;
        this.data = user.body;
        this.playback = playerStatus;
    }

    isValid(): boolean {
        if (!this.data || !this.playback) return false;

        const isPremium = this.data.product === 'premium';
        const isInPrivateMode = this.playback.statusCode !== 200 && JSON.stringify(this.playback.body) !== JSON.stringify({});

        return isPremium && !isInPrivateMode;
    }
}
