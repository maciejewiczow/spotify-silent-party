import { User } from 'models/User'
import { api } from './connect'

export function use(userToken: string): void
export function use(userToken: User): void
export function use(userToken: User | string): void {
    if (userToken instanceof User) {
        api.setAccessToken(userToken.accessToken)
        return
    }
    api.setAccessToken(userToken)
}
