/* eslint-disable @typescript-eslint/no-explicit-any */
import * as RC from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

declare module 'routing-controllers' {
    export interface Action {
        request: Request;
        response: Response;
        // not used by me, because it's a Koa thing
        context?: any;
        next?: NextFunction;
    }

    export interface CustomParameterDecorator {
        required?: boolean;
        value: (action: Action, value?: any) => Promise<any> | any;
    }

    export function createParamDecorator(options: CustomParameterDecorator): (object: Record<string, any>, method: string, index: number) => void;
}