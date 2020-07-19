import jwt, { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

const sign = (
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options?: SignOptions
): Promise<string> =>
    new Promise((resolve, reject) => {
        if (options !== undefined) {
            jwt.sign(payload, secretOrPrivateKey, options, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        } else {
            jwt.sign(payload, secretOrPrivateKey, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        }
    });

const verify = (
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions
): Promise<object | string> =>
    new Promise((resolve, reject) => {
        if (options !== undefined) {
            jwt.verify(token, secretOrPublicKey, options, (err, result) => {
                if (err) reject(err);
                if (result) resolve(result);
            });
        } else {
            jwt.verify(token, secretOrPublicKey, (err, result) => {
                if (err) reject(err);
                if (result) resolve(result);
            });
        }
    });

export default {
    sign, verify
};
