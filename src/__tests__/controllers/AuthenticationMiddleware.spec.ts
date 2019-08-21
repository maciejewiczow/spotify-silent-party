import { expect } from 'chai';
import { spy } from 'sinon';

import { BadRequestError, UnauthorizedError, InternalServerError } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { verifyAuthCode, verifyAuthState } from 'middleware';
import { GrantCodeToken } from 'utils/apiModels';
import { JWT_SECRET } from 'index';

describe('Authentication middleware', () => {
    describe('GET /callback middleware - verifyAuthState', () => {
        let req: Partial<Request>;
        const res: Partial<Response> = {},
            next = spy();

        beforeEach(() => {
            req = {
                query: {
                    state: 'some_state',
                    code: 'some_code'
                }
            };
        });

        afterEach(() => next.resetHistory());

        it('Follows the happy path, removing state from session after verification', () => {
            verifyAuthState(req, res, next);
            expect(req.session.state).to.be.undefined;
            expect(next.called).to.be.true;
        });
        it('Throws InternalServerError if session not present', () => {
            delete req.session;
            expect(verifyAuthState.bind(verifyAuthState, req, res, next)).to.throw(InternalServerError, 'Session not present!');
        });
        it('Throws BadRequestError if state not present in the query', () => {
            delete req.query.state;
            expect(verifyAuthState.bind(verifyAuthState, req, res, next)).to.throw(BadRequestError, 'State not present!');
        });
        it('Throws UnauthorizedError if provided state does not match state in session', () => {
            req.query.state = 'some_other_state';
            expect(verifyAuthState.bind(verifyAuthState, req, res, next)).to.throw(UnauthorizedError, 'State mismatch!');
        });
        it('Throws UnauthorizedError if access_denied error is returned from spotify', () => {
            req.query.error = 'access_denied';
            expect(verifyAuthState.bind(verifyAuthState, req, res, next)).to.throw(UnauthorizedError, 'User denied login request');
        });
        it('Throws UnathorizedError if there is any error returned from spotify', () => {
            req.query.error = 'other_error';
            expect(verifyAuthState.bind(verifyAuthState, req, res, next)).to.throw(UnauthorizedError, 'Authorization failed');
        });
        it('Throws BadRequestError if there is no error and no code provided', () => {
            delete req.query.code;
            expect(verifyAuthState.bind(verifyAuthState, req, res, next)).to.throw(BadRequestError, 'Code not provided');
        });
    });

    describe('GET /token middleware - verifyAuthCode', () => {
        let req: Partial<Request>;
        let codeToken: Partial<GrantCodeToken>;
        const res: Partial<Response> = {};
        const next = spy();

        beforeEach(() => {
            codeToken = {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                userId: 'some_id',
                isGrantToken: true
            };
            req = {
                query: {
                    code: 'some_code'
                }
            };
        });

        afterEach(() => next.resetHistory());

        it('Follows the happy path, removing the code from session after verification', () => {
            const code = jwt.sign(codeToken, JWT_SECRET);

            req.session.code = req.query.code = code;

            verifyAuthCode(req, res, next);

            expect(req.session.code).to.be.undefined;
            expect(next.called).to.be.true;
        });

        it('Throws InternalServerError if session not present', () => {
            delete req.session;
            expect(verifyAuthCode.bind(verifyAuthCode, req, res, next)).to.throw(InternalServerError, 'Session not present!');
        });
        it('Throws BadRequestError if there is no code provided in query', () => {
            delete req.query.code;
            expect(verifyAuthCode.bind(verifyAuthCode, req, res, next)).to.throw(BadRequestError, 'No code provided');
        });
        it('Throws BadRequestError if there is no code stored in session', () => {
            delete req.session.code;
            expect(verifyAuthCode.bind(verifyAuthCode, req, res, next)).to.throw(BadRequestError, 'You need to start an authentication flow first');
        });
        it('Throws UnauthorizedError if provided code does not match saved one', () => {
            req.query.code = 'some_other_code';
            expect(verifyAuthCode.bind(verifyAuthCode, req, res, next)).to.throw(UnauthorizedError, 'Token mismatch');
        });
        it('Throws UnauthorizedError if code is expired', () => {
            codeToken.exp = Math.floor(Date.now() / 1000) - 4 * 60 * 60;
            const code = jwt.sign(codeToken, JWT_SECRET);

            req.query.code = req.session.code = code;
            expect(verifyAuthCode.bind(verifyAuthCode, req, res, next)).to.throw(UnauthorizedError, /^Invalid token/);
        });
        it('Throws UnauthorizedError if code is not a Grant Token', () => {
            delete codeToken.isGrantToken;
            const code = jwt.sign(codeToken, JWT_SECRET);
            req.query.code = req.session.code = code;

            expect(verifyAuthCode.bind(verifyAuthCode, req, res, next)).to.throw(UnauthorizedError, /^Invalid token/);
        });
        it('Throws UnauthorizedError if code does not contain current user id');
    });
});
