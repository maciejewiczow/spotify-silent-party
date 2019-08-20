import * as SpotifyApi from 'spotify-web-api-node'

// @ts-ignore
export const api = new SpotifyApi({
    clientId: process.env.SPOTIFY_APP_ID,
    clientSecret: process.env.SPOTIFY_APP_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URL
})
