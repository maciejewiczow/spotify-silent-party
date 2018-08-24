import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import dotenv from 'dotenv'
import SpotifyApi from 'spotify-web-api-node'

export const SCOPES = ['user-read-email', 'user-read-private', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing']
export const STATE_KEY = 'spoti_authentication_state'

dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(compression())

// app.use('/', router)

export default app
