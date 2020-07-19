/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { HttpError } from 'routing-controllers';

const replacer = () => {
    const cache: any[] = [];
    return (key: string, value: any) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Duplicate reference found
                try {
                    // If this value does not reference a parent it can be deduped
                    return JSON.parse(JSON.stringify(value));
                } catch (error) {
                    // discard key if value cannot be deduped
                    return;
                }
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    };
};

export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
    console.log(`Incoming request from ${req.ip} to ${req.path} endpoint`);
    next();
}

export function errorLoggerMiddleware(
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error('Error happened! ', JSON.stringify(err, replacer(), 2));

    fs.writeFileSync('logs/req.json', JSON.stringify(req, replacer(), 2), { encoding: 'utf8' });
    fs.writeFileSync('logs/res.json', JSON.stringify(res, replacer(), 2), { encoding: 'utf8' });

    next(err);
}
