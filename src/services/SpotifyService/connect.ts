import SpotifyApi = require('spotify-web-api-node');

export const api = new SpotifyApi({
    clientId: process.env.SPOTIFY_APP_ID,
    clientSecret: process.env.SPOTIFY_APP_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URL
});
