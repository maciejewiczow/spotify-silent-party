import { SpotifyAuthenticationController } from './SpotifyAuthenticationController';
import { AuthenticationController } from './AuthenticationController';

// exported as array, because routing-controllers expexts an array of controllers in it's setup
export default [SpotifyAuthenticationController, AuthenticationController];
