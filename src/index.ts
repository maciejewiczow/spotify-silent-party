import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import express from 'express';

import controllers from 'controllers';
import { loggerMiddleware, errorLoggerMiddleware } from 'middleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.removeHeader('X-Powered-By');
    next();
});

export const NODE_ENV = app.get('env');
export const IS_DEV_ENV = NODE_ENV === 'dev';

if (IS_DEV_ENV) {
    app.use(loggerMiddleware);
    app.use(errorLoggerMiddleware);
}

useExpressServer(app, {
    controllers
});

export const SCOPES = [
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing'
];
export const FRONT_ADDR = IS_DEV_ENV ? 'http://localhost:8080' : '';
export const JWT_SECRET = process.env.JWT_AUTH_SECRET || '6964c11c-dcaa-55a7-a43b-0501e6ac4903';

export default app;
