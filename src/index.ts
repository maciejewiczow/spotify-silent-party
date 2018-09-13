import 'reflect-metadata'

import { createExpressServer } from 'routing-controllers'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { Express } from 'express'

import controllers from 'controllers'
import { sessionMiddleware } from 'middleware'

dotenv.config()

const app: Express = createExpressServer({
    controllers
})

app.use(sessionMiddleware)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(compression())

export const SCOPES = ['user-read-email', 'user-read-private', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing']
export const IS_DEV_ENV = app.get('env') !== 'production'
export const FRONT_ADDR = IS_DEV_ENV ? 'http://localhost:3000' : ''
export const SESSION_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours
export const JWT_SECRET = process.env.JWT_AUTH_SECRET || 'jakis&Sekret123'

export default app
