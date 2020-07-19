export interface ExpiringJWT {
    iat: number;
    exp: number;
}

/**
 * Scheme of access tokens, used to authenticte users in endpoints needing privilages to use
 *
 * @interface AccessToken
 *
 * @property exp - expiration date
 * @property iat - token issue date
 * @property isAccessToken - identidfies this token as access token
 * @property accessLevel - states the access level, 0 beeing a normal user, 1 - admin of some party
 * @property userId - id of user who owns the token
 */
export interface AccessToken {
    isAccessToken: true;
    accessLevel: AccessLevel;
    userId: string;
}

/**
 * Enum containing all possible user access levels
 *
 * @enum {number}
 */
export enum AccessLevel {
    normal = 0,
    partyAdmin = 1
}

/**
 * Token returned from /auth/url, used to verify state that came back from spotify
 *
 * @interface StateToken
 * @extends {ExpiringJWT}
 */
export interface StateToken {
    isStateToken: true;
}

export const STATE_TOKEN_TTL = 60 * 60; // 1h
