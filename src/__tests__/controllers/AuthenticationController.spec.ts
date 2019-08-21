import { expect } from 'chai';
import * as request from 'supertest';
import * as sinon from 'sinon';
import * as nodeUrl from 'url';
import * as jwt from 'jsonwebtoken';
import * as helpers from 'sinon-helpers';

import { Spotify } from 'services';
import { User } from 'models';

const codeGrantStub = sinon.stub(Spotify.api, 'authorizationCodeGrant');
const userValidateStub = sinon.stub(User.prototype, 'isValid');
const jwtSignStub = sinon.stub(jwt, 'sign');
const userLoadDataSpy = sinon.spy(User.prototype, 'loadData');
const userNewSpy = sinon.spy(User.prototype, 'constructor');

import app from 'index';

describe('Authentication controller /auth', () => {
    describe('GET /login', () => {
        it('Rediredcts to spotify accounts website', () =>
            request(app)
                .get('/auth/login')
                .expect(302)
                .expect('Location', /^(https:\/\/accounts\.spotify\.com\/authorize)/));
    });

    describe.only('GET /callback', () => {
        let agent: request.SuperTest<request.Test>;
        let state: string | string[];

        beforeEach(async () => {
            agent = request.agent(app);

            const res = await agent.get('/auth/login');

            state = nodeUrl.parse(res.header['location'], true).query.state;
            console.log(state);
        });

        afterEach(() => sinon.reset());

        it.only('Calls spotify api for token grant with provided code', async () => {
            codeGrantStub.resolves({
                headers: {},
                statusCode: 200,
                body: {
                    access_token: '',
                    refresh_token: '',
                    expires_in: 3600,
                    scope: '',
                    token_type: 'Bearer'
                }
            });

            await agent.get(`/auth/callback?state=${state}&code=someCode`);

            expect(codeGrantStub.calledOnce).to.eql(true);
            expect(codeGrantStub.args[0][0]).to.eql('someCode');
        });

        it('Creates new User with tokens provided by spotify', async () => {
            // codeGrantStub.resolves({
            //     body: {
            //         access_token: 'token1',
            //         refresh_token: 'token2',
            //         expires_in: '3h'
            //     }
            // });

            await agent.get(`/auth/callback?state=${state}&code=someCode`);

            expect(userNewSpy.calledOnce).to.eql(true);
            expect(userLoadDataSpy.calledOnce).to.eql(true);
            expect(userNewSpy.args[0][0]).to.eql('token1');
            expect(userNewSpy.args[0][1]).to.eql('token2');
            expect(userNewSpy.args[0][2]).to.eql('3h');
        });
        it('Throws ForbiddenError if user is not premium');
        it('Regenerates the session');
        it('Sets user as current in the session');
        it('Saves user to redis');
        it('Saves generated code to session');
        it('Redirects to frontend with code in query');
    });

    describe('GET /token', () => {
        it('Saves generated access token to session');
        it('Returns access token');
        it('Returns token with default access level');
        it('Returns token assigned to current user id');
    });
});
