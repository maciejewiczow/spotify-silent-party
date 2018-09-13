import { CurrentUser } from 'routing-controllers'
import { SessionDec } from './index'

export const CurrentUserRequired = (options?: any) => CurrentUser({ ...options, required: true })
export const SessionRequired = () => SessionDec({ required: true })
