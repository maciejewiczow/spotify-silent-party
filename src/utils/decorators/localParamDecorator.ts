import { createParamDecorator } from 'routing-controllers';

export interface LocalsObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface LocalsDecoratorOptions {
    required?: boolean;
}

export const Locals = (options?: LocalsDecoratorOptions) =>
    createParamDecorator({
        required: options ? options.required : false,
        value: action => action.response.locals
    });

export const LocalsParam = (key: string, options?: { required?: boolean }) =>
    createParamDecorator({
        required: options ? options.required : false,
        value: action => action.response.locals[key] || undefined
    });
