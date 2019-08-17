import 'reflect-metadata'
import * as dotenv from 'dotenv'
dotenv.config()

import { useExpressServer } from 'routing-controllers'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as express from 'express'

import controllers from 'controllers'
import { loggerMiddleware, errorLoggerMiddleware } from 'middleware'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
    res.removeHeader('X-Powered-By')
    next()
})

export const IS_DEV_ENV = app.get('env') !== 'production'

if (IS_DEV_ENV) {
    app.use(loggerMiddleware)
    app.use(errorLoggerMiddleware)
}

useExpressServer(app, {
    controllers
})

export const SCOPES = ['user-read-email', 'user-read-private', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing']
export const SESSION_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours
export const FRONT_ADDR = IS_DEV_ENV ? 'http://localhost:8080' : ''
export const JWT_SECRET = process.env.JWT_AUTH_SECRET || '6964c11c-dcaa-55a7-a43b-0501e6ac4903'

export default app
