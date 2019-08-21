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
    exp: number;
    iat: number;
    isAccessToken: true;
    accessLevel: AccessLevel;
    userId: string;
}

export enum AccessLevel {
    normal = 0,
    partyAdmin = 1
}

export const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
export const GRANT_CODE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Scheme of grant code token, used to get the acces token by clients
 *
 * @interface GrantCodeToken
 *
 * @property exp - expiration date
 * @property iat - token issue date
 * @property isGrantToken - identifies this token as grant code
 * @property userId - id of user, who tries to obtain access token
 */
export interface GrantCodeToken {
    exp: number;
    iat: number;
    isGrantToken: true;
    userId: string;
}
