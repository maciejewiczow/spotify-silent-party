import 'reflect-metadata'

import { createExpressServer } from 'routing-controllers'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import dotenv from 'dotenv'

import controllers from 'backend/controllers'
import { sessionMiddleware } from 'backend/middleware'

dotenv.config()

const app = createExpressServer({
    controllers
})

app.use(sessionMiddleware)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(compression())

export const STATE_KEY = 'spoti_authentication_state'
export const SCOPES = ['user-read-email', 'user-read-private', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing']

export default app
