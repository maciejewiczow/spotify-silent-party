import { CurrentUser } from 'routing-controllers'

export const CurrentUserRequired = (options?: any) => CurrentUser({ ...options, required: true })
