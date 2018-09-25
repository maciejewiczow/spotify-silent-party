import { expect } from 'chai'
import * as request from 'supertest'

import app from 'index'

describe('Authentication controller /auth', () => {
    describe('GET /login', () => {
        it('Rediredcts to spotify accounts website', done => {
            request(app)
                .get('/auth/login')
                .expect(302)
                .expect('Location', /^(https:\/\/accounts\.spotify\.com\/authorize)/)
                .end(done)
        })
    })

    describe('GET /callback', () => {
        it('Calls spotify api for token grant with provided code', () => expect(true).to.be.true)
        it('Creates new User with tokens provided by spotify')
        it('Throws ForbiddenError if user is not premium')
        it('Regenerates the session')
        it('Sets user as current in the session')
        it('Saves user to redis')
        it('Saves generated code to session')
        it('Redirects to frontend with code in query')
    })

    describe('GET /token', () => {
        it('Saves generated access token to session')
        it('Returns access token')
        it('Returns token with default access level')
        it('Returns token assigned to current user id')
    })
})
