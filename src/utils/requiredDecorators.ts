import { CurrentUser } from 'routing-controllers'
import { SessionDec, SessionParam } from './index'

export const CurrentUserRequired = (options?: any) => CurrentUser({ ...options, required: true })
export const SessionRequired = () => SessionDec({ required: true })
export const SessionParamRequired = (key: string) => SessionParam(key, { required: true })
