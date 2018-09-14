import { createParamDecorator } from 'routing-controllers'

export function SessionDec(options?: { required?: boolean }) {
    return createParamDecorator({
        required: options ? options.required : false,
        value: action => action.request.session || undefined
    })
}

export function SessionParam(key: string, options?: { required?: boolean }) {
    return createParamDecorator({
        required: options ? options.required : false,
        value: action => action.request.session[key] || undefined
    })
}
