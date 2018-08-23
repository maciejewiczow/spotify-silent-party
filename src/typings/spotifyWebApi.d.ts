declare module 'spotify-web-api-node' {
    import {
        TrackObjectSimplified,
        TrackObjectFull,
        PagingObject,
        PlaylistObjectSimplified,
        AlbumObjectSimplified,
        CreatePlaylistResponse,
        FollowPlaylistReponse,
        UnfollowPlaylistReponse,
        ChangePlaylistDetailsReponse,
        VoidResponse,
        AddTracksToPlaylistResponse,
        RemoveTracksFromPlaylistResponse,
        ReplacePlaylistTracksResponse,
        ReorderPlaylistTracksResponse,
        AudioFeaturesResponse,
        AudioAnalysisResponse,
        MultipleAudioFeaturesResponse,
        RecommendationsOptionsObject,
        RecommendationsFromSeedsResponse,
        AvailableGenreSeedsResponse,
        UsersSavedTracksResponse,
        CheckUsersSavedTracksResponse,
        RemoveUsersSavedTracksResponse,
        SaveTracksForUserResponse,
        RemoveAlbumsForUserResponse,
        SaveAlbumsForUserResponse,
        UsersSavedAlbumsResponse,
        CheckUserSavedAlbumsResponse,
        UsersTopArtistsResponse,
        UsersTopTracksResponse,
        CursorBasedPagingObject,
        ArtistObjectFull,
        CategoryObject,
        ListOfNewReleasesResponse,
        ListOfFeaturedPlaylistsResponse,
        MultipleCategoriesResponse,
        PlayHistoryObject,
        CurrentlyPlayingResponse,
        CurrentlyPlayingContextResponse
    } from 'spotify-api-response-schemas'

    /**
     * Error returned during authentication flow
     *
     * @export
     * @interface SpotifyAuthenticationError
     */
    interface SpotifyAuthenticationError {
        error: string
        error_description: string
    }

    /**
     * General Error, returned by any other failed requests
     *
     * @export
     * @interface SpotifyError
     */
    interface SpotifyError {
        status: number
        message: string
    }

    type CallbackFn<ResponseDataScheme> = (error: SpotifyError | SpotifyAuthenticationError, data: ApiResponse<ResponseDataScheme>) => any

    /**
     * Basic response wrapper returned by all object methods
     *
     * @export
     * @interface ApiResponse
     * @template ResponseDataScheme
     */
    interface ApiResponse<ResponseDataScheme> {
        body: ResponseDataScheme
        headers: Headers
        statusCode: number
    }

    interface Credentials {
        accessToken?: string
        refreshToken?: string
        redirectUri?: string
        clientId?: string
        clientSecret?: string
    }

    interface SnapshotOperationOptions {
        snapshot_id?: string
    }

    interface PaginationOptions {
        limit?: number
        offset?: number
    }

    interface AlbumArtistTrackOptions {
        market?: string
        country?: string
        locale?: string
    }

    interface PlaylistOptions {
        fields?: string
    }

    interface PlaylistDetailsOptions {
        name?: string
        public?: boolean
        collaborative?: boolean
        description?: string
    }

    type GetPlaylistOptions = PlaylistOptions & AlbumArtistTrackOptions

    type SearchItemTypes = 'album' | 'artist' | 'track' | 'playlist'

    type SearchOptions = PaginationOptions & AlbumArtistTrackOptions

    type ArtistAlbumsOptions = { include_groups?: string } & AlbumArtistTrackOptions & PaginationOptions

    interface FollowPlaylistOptions {
        public?: boolean
    }

    interface AddTracksToPlaylistOptions {
        position?: number
    }

    interface TopArtistsTracksOptions extends PaginationOptions {
        time_range?: 'short_term' | 'medum_term' | 'long_term'
    }

    interface RecentlyPlayedOptions {
        limit?: number
        after?: number
        before?: number
    }

    interface TransferPlaybackOptions {
        device_ids: string[]
        play?: boolean
    }

    interface PlaybackOptions {
        device_id?: string
    }

    interface RepeatShuffleOptions extends PlaybackOptions {
        state: 'track' | 'context' | 'off'
    }

    interface PlayOptions extends PlaybackOptions {
        context_uri?: string
        uris?: string[]
        offset?:
            | {
                  position: number
              }
            | {
                  uri: string
              }
        position_ms?: number
    }

    interface FollowedArtistsOptions {
        limit?: number
        after?: string
    }

    interface FeaturedPlaylistsOptions extends PaginationOptions, AlbumArtistTrackOptions {
        timestamp?: string
    }

    export default class SpotifyApi {
        constructor(credentials: Credentials)

        setCredentials(credentials: string | Credentials): void

        getCredentials(): string

        resetCredentials(): void

        setClientId(clientId: string): void

        setClientSecret(clientSecret: string): void

        setAccessToken(accessToken: string): void

        setRefreshToken(refreshToken: string): void

        setRedirectURI(redirectUri: string): void

        getRedirectURI(): string

        getClientId(): string

        getClientSecret(): string

        getAccessToken(): string

        getRefreshToken(): string

        resetClientId(): void

        resetClientSecret(): void

        resetAccessToken(): void

        resetRefreshToken(): void

        resetRedirectURI(): void

        /**
         * Look up a track.
         * @param {string} trackId The track's ID.
         * @param {Object} [options] The possible options, currently only market.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getTrack('3Qm86XLflmIXVm1wcwkgDK').then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing information
         *          about the track. Not returned if a callback is given.
         */
        getTrack(trackId: string, options?: AlbumArtistTrackOptions): Promise<ApiResponse<any>>
        getTrack(trackId: string, options: AlbumArtistTrackOptions, callback: CallbackFn<ApiResponse<any>>): void

        /**
         * Look up several tracks.
         * @param {string[]} trackIds The IDs of the artists.
         * @param {Object} [options] The possible options, currently only market.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getArtists(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin']).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing information
         *          about the artists. Not returned if a callback is given.
         */
        getTracks(trackIds: string[], options?: AlbumArtistTrackOptions): Promise<ApiResponse<any>>
        getTracks(trackIds: string[], options: AlbumArtistTrackOptions, callback: CallbackFn<ApiResponse<any>>): void

        /**
         * Look up an album.
         * @param {string} albumId The album's ID.
         * @param {Object} [options] The possible options, currently only market.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing information
         *          about the album. Not returned if a callback is given.
         */
        getAlbum(albumId: string, options?: AlbumArtistTrackOptions): Promise<ApiResponse<any>>
        getAlbum(albumId: string, options: AlbumArtistTrackOptions, callback: CallbackFn<ApiResponse<any>>): void

        /**
         * Look up several albums.
         * @param {string[]} albumIds The IDs of the albums.
         * @param {Object} [options] The possible options, currently only market.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getAlbums(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin']).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing information
         *          about the albums. Not returned if a callback is given.
         */
        getAlbums(albumIds: string[], options?: AlbumArtistTrackOptions): Promise<ApiResponse<any>>
        getAlbums(albumIds: string[], options: AlbumArtistTrackOptions, callback: CallbackFn<ApiResponse<any>>): void

        /**
         * Look up an artist.
         * @param {string} artistId The artist's ID.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example api.getArtist('1u7kkVrr14iBvrpYnZILJR').then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing information
         *          about the artist. Not returned if a callback is given.
         */
        getArtist(artistId: string): Promise<ApiResponse<any>>
        getArtist(artistId: string, callback: CallbackFn<ApiResponse<any>>): void

        /**
         * Look up several artists.
         * @param {string[]} artistIds The IDs of the artists.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getArtists(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin']).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing information
         *          about the artists. Not returned if a callback is given.
         */
        getArtists(artistIds: string[]): Promise<ApiResponse<any>>
        getArtists(artistIds: string[], callback: CallbackFn<ApiResponse<any>>): void

        /**
         * Search for music entities of certain types.
         * @param {string} query The search query.
         * @param {string[]} types An array of item types to search across.
         * Valid types are: 'album', 'artist', 'playlist', and 'track'.
         * @param {Object} [options] The possible options, e.g. limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example search('Abba', ['track', 'playlist'], { limit : 5, offset : 1 }).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the
         *          search results. The result is paginated. If the promise is rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        search(query: string, types: SearchItemTypes[], options?: SearchOptions): Promise<ApiResponse<any>>
        search(query: string, types: SearchItemTypes[], options: SearchOptions, callback: CallbackFn<ApiResponse<any>>): void

        /**
         * Search for an album.
         * @param {string} query The search query.
         * @param {Object} [options] The possible options, e.g. limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example searchAlbums('Space Oddity', { limit : 5, offset : 1 }).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the
         *          search results. The result is paginated. If the promise is rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        searchAlbums(query: string, options?: SearchOptions): Promise<ApiResponse<any>>
        searchAlbums(query: string, options: SearchOptions, callback: CallbackFn<ApiResponse<any>>): void

        /**
         * Search for an artist.
         * @param {string} query The search query.
         * @param {Object} [options] The possible options, e.g. limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example searchArtists('David Bowie', { limit : 5, offset : 1 }).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the
         *          search results. The result is paginated. If the promise is rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        searchArtists(query: string, options?: SearchOptions): Promise<ApiResponse<any>>
        searchArtists(query: string, options: SearchOptions, callback: CallbackFn<any>): void

        /**
         * Search for a track.
         * @param {string} query The search query.
         * @param {Object} [options] The possible options, e.g. limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example searchTracks('Mr. Brightside', { limit : 3, offset : 2 }).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the
         *          search results. The result is paginated. If the promise is rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        searchTracks(query: string, options?: SearchOptions): Promise<ApiResponse<any>>
        searchTracks(query: string, options: SearchOptions, callback: CallbackFn<any>): void

        /**
         * Search for playlists.
         * @param {string} query The search query.
         * @param {Object} options The possible options.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example searchPlaylists('workout', { limit : 1, offset : 0 }).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the
         *          search results. The result is paginated. If the promise is rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        searchPlaylists(query: string, options?: SearchOptions): Promise<ApiResponse<any>>
        searchPlaylists(query: string, options: SearchOptions, callback: CallbackFn<any>): void
        /**
         * Get an artist's albums.
         * @param {string} artistId The artist's ID.
         * @options {Object} [options] The possible options, e.g. limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getArtistAlbums('0oSGxfWSnnOXhD2fKuz2Gy', { album_type : 'album', country : 'GB', limit : 2, offset : 5 }).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the albums
         *          for the given artist. The result is paginated. If the promise is rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        getArtistAlbums(artistId: string, options?: ArtistAlbumsOptions): Promise<ApiResponse<any>>
        getArtistAlbums(artistId: string, options: ArtistAlbumsOptions, callback: CallbackFn<any>): void

        /**
         * Get the tracks of an album.
         * @param albumId the album's ID.
         * @options {Object} [options] The possible options, e.g. limit.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ', { limit : 5, offset : 1 }).then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the
         *                    tracks in the album. The result is paginated. If the promise is rejected.
         *                    it contains an error object. Not returned if a callback is given.
         */
        getAlbumTracks(albumId: string, options?: SearchOptions): Promise<ApiResponse<any>>
        getAlbumTracks(albumId: string, options: SearchOptions, callback: CallbackFn<any>): void

        /**
         * Get an artist's top tracks.
         * @param {string} artistId The artist's ID.
         * @param {string} country The country/territory where the tracks are most popular. (format: ISO 3166-1 alpha-2)
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'GB').then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the
         *          artist's top tracks in the given country. If the promise is rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        getArtistTopTracks(artistId: string, country: string): Promise<ApiResponse<any>>
        getArtistTopTracks(artistId: string, country: string, callback: CallbackFn<any>): void

        /**
         * Get related artists.
         * @param {string} artistId The artist's ID.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getArtistRelatedArtists('0oSGxfWSnnOXhD2fKuz2Gy').then(...)
         * @returns {Promise|undefined} A promise that if successful, returns an object containing the
         *          related artists. If the promise is rejected, it contains an error object. Not returned if a callback is given.
         */
        getArtistRelatedArtists(artistId: string): Promise<ApiResponse<any>>
        getArtistRelatedArtists(artistId: string, callback: CallbackFn<any>): void
        /**
         * Get information about a user.
         * @param userId The user ID.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getUser('thelinmichael').then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object
         *          containing information about the user. If the promise is
         *          rejected, it contains an error object. Not returned if a callback is given.
         */
        getUser(userId: string): Promise<ApiResponse<any>>
        getUser(userId: string, callback: CallbackFn<any>): void

        /**
         * Get information about the user that has signed in (the current user).
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getMe().then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object
         *          containing information about the user. The amount of information
         *          depends on the permissions given by the user. If the promise is
         *          rejected, it contains an error object. Not returned if a callback is given.
         */
        getMe(): Promise<ApiResponse<any>>
        getMe(callback: CallbackFn<any>): void

        /**
         * Get a user's playlists.
         * @param {string} userId An optional id of the user. If you know the Spotify URI it is easy
         * to find the id (e.g. spotify:user:<here_is_the_id>). If not provided, the id of the user that granted
         * the permissions will be used.
         * @param {Object} [options] The options supplied to this request.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getUserPlaylists('thelinmichael').then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
         *          a list of playlists. If rejected, it contains an error object. Not returned if a callback is given.
         */
        getUserPlaylists(userId: string, options?: PaginationOptions): Promise<ApiResponse<any>>
        getUserPlaylists(userId: string, options: PaginationOptions, callback: CallbackFn<any>): void

        /**
         * @deprecated playlist operations now do not require a userId
         *
         * Get a playlist.
         * @param {string} userId The playlist's owner's user ID.
         * @param {string} playlistId The playlist's ID.
         * @param {Object} [options] The options supplied to this request.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getPlaylist('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK').then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
         *          the playlist. If rejected, it contains an error object. Not returned if a callback is given.
         */
        getPlaylist(userId: string, playlistId: string, options?: GetPlaylistOptions): Promise<ApiResponse<any>>
        getPlaylist(userId: string, playlistId: string, options: GetPlaylistOptions, callback: CallbackFn<any>): void

        /**
         * @deprecated playlist operations now do not require a userId
         *
         * Get tracks in a playlist.
         * @param {string} userId THe playlist's owner's user ID.
         * @param {string} playlistId The playlist's ID.
         * @param {Object} [options] Optional options, such as fields.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getPlaylistTracks('thelinmichael', '3ktAYNcRHpazJ9qecm3ptn').then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object that containing
         * the tracks in the playlist. If rejected, it contains an error object. Not returned if a callback is given.
         */
        getPlaylistTracks(userId: string, playlistId: string, options?: GetPlaylistOptions & PaginationOptions): Promise<ApiResponse<any>>
        getPlaylistTracks(userId: string, playlistId: string, options: GetPlaylistOptions & PaginationOptions, callback: CallbackFn<any>): void

        /**
         * @deprecated playlist operations now do not require a userId
         *
         * Create a playlist.
         * @param {string} userId The playlist's owner's user ID.
         * @param {string} playlistName The name of the playlist.
         * @param {Object} [options] The possible options, currently only public.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example createPlaylist('thelinmichael', 'My cool playlist!', { public : false }).then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing information about the
         *          created playlist. If rejected, it contains an error object. Not returned if a callback is given.
         */
        createPlaylist(userId: string, playlistName: string, options?: PlaylistDetailsOptions): Promise<ApiResponse<CreatePlaylistResponse>>
        createPlaylist(userId: string, playlistName: string, options: PlaylistDetailsOptions, callback: CallbackFn<CreatePlaylistResponse>): void

        /**
         * @deprecated playlist operations now do not require a userId
         *
         * Follow a playlist.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {Object} [options] The possible options, currently only public.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        followPlaylist(userId: string, playlistId: string, options?: FollowPlaylistOptions): Promise<ApiResponse<FollowPlaylistReponse>>
        followPlaylist(userId: string, playlistId: string, options: FollowPlaylistOptions, callback: CallbackFn<FollowPlaylistReponse>): void

        /**
         * @deprecated playlist operations now do not require a userId
         *
         * Unfollow a playlist.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {Object} [options] The possible options, currently only public.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        unfollowPlaylist(userId: string, playlistId: string): Promise<ApiResponse<UnfollowPlaylistReponse>>
        unfollowPlaylist(userId: string, playlistId: string, callback: CallbackFn<UnfollowPlaylistReponse>): void

        /**
         * @deprecated playlist operations now do not require a userId
         *
         * Change playlist details.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {Object} [options] The possible options, e.g. name, public.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example changePlaylistDetails('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK', {name: 'New name', public: true}).then(...)
         * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        changePlaylistDetails(userId: string, playlistId: string, options?: PlaylistDetailsOptions): Promise<ApiResponse<ChangePlaylistDetailsReponse>>
        changePlaylistDetails(userId: string, playlistId: string, options: PlaylistDetailsOptions, callback: CallbackFn<ChangePlaylistDetailsReponse>): void

        /**
         * @deprecated playlist operations now do not require a userId
         *
         * Replace the image used to represent a specific playlist.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {string} base64URI Base64 encoded JPEG image data, maximum payload size is 256 KB
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example uploadCustomPlaylistCoverImage('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK', 'longbase64uri').then(...)
         * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        uploadCustomPlaylistCoverImage(userId: string, playlistId: string, base64URI: string): Promise<ApiResponse<VoidResponse>>
        uploadCustomPlaylistCoverImage(userId: string, playlistId: string, base64URI: string, callback: CallbackFn<VoidResponse>): void

        /**
         * @deprecated playlist operations now do not require a userId
         *
         * Add tracks to a playlist.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {string[]} tracks URIs of the tracks to add to the playlist.
         * @param {Object} [options] Options, position being the only one.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example addTracksToPlaylist('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK',
                    '["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]').then(...)
        * @returns {Promise|undefined} A promise that if successful returns an object containing a snapshot_id. If rejected,
        * it contains an error object. Not returned if a callback is given.
        */
        addTracksToPlaylist(userId: string, playlistId: string, tracks: string[], options?: AddTracksToPlaylistOptions): Promise<ApiResponse<AddTracksToPlaylistResponse>>
        addTracksToPlaylist(userId: string, playlistId: string, tracks: string[], options: AddTracksToPlaylistOptions, callback: CallbackFn<AddTracksToPlaylistResponse>): void

        /**
         * Remove tracks from a playlist.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {Object[]} tracks An array of objects containing a property called uri with the track URI (String), and
         * a an optional property called positions (int[]), e.g. { uri : "spotify:track:491rM2JN8KvmV6p0oDDuJT", positions : [0, 15] }
         * @param {Object} options Options, snapshot_id being the only one.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns an object containing a snapshot_id. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        removeTracksFromPlaylist(userId: string, playlistId: string, tracks: string[], options?: SnapshotOperationOptions): Promise<ApiResponse<RemoveTracksFromPlaylistResponse>>
        removeTracksFromPlaylist(userId: string, playlistId: string, tracks: string[], options: SnapshotOperationOptions, callback: CallbackFn<RemoveTracksFromPlaylistResponse>): void

        /**
         * Remove tracks from a playlist by position instead of specifying the tracks' URIs.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {int[]} positions The positions of the tracks in the playlist that should be removed
         * @param {string} snapshot_id The snapshot ID, or version, of the playlist. Required
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns an object containing a snapshot_id. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        removeTracksFromPlaylistByPosition(userId: string, playlistId: string, positions: number[], snapshotId: string): Promise<ApiResponse<RemoveTracksFromPlaylistResponse>>
        removeTracksFromPlaylistByPosition(userId: string, playlistId: string, positions: number[], snapshotId: string, callback: CallbackFn<RemoveTracksFromPlaylistResponse>): void

        /**
         * Replace tracks in a playlist.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {Object[]} uris An array of track URIs (strings)
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns an empty object. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        replaceTracksInPlaylist(userId: string, playlistId: string, uris: string[]): Promise<ApiResponse<ReplacePlaylistTracksResponse>>
        replaceTracksInPlaylist(userId: string, playlistId: string, uris: string[], callback: CallbackFn<ReplacePlaylistTracksResponse>): void

        /**
         * Reorder tracks in a playlist.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {int} rangeStart The position of the first track to be reordered.
         * @param {int} insertBefore The position where the tracks should be inserted.
         * @param {Object} options Optional parameters, i.e. range_length and snapshot_id.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns an object containing a snapshot_id. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        reorderTracksInPlaylist(userId: string, playlistId: string, rangeStart: number, insertBefore: number, options: SnapshotOperationOptions): Promise<ApiResponse<ReorderPlaylistTracksResponse>>
        reorderTracksInPlaylist(
            userId: string,
            playlistId: string,
            rangeStart: number,
            insertBefore: number,
            options: SnapshotOperationOptions,
            callback: CallbackFn<ReorderPlaylistTracksResponse>
        ): void

        /**
         * Get audio features for a single track identified by its unique Spotify ID.
         * @param {string} trackId The track ID
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getAudioFeaturesForTrack('38P3Q4QcdjQALGF2Z92BmR').then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object
         *          containing information about the audio features. If the promise is
         *          rejected, it contains an error object. Not returned if a callback is given.
         */
        getAudioFeaturesForTrack(trackId: string): Promise<ApiResponse<AudioFeaturesResponse>>
        getAudioFeaturesForTrack(trackId: string, callback: CallbackFn<AudioFeaturesResponse>): void

        /**
         * Get audio analysis for a single track identified by its unique Spotify ID.
         * @param {string} trackId The track ID
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getAudioAnalysisForTrack('38P3Q4QcdjQALGF2Z92BmR').then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object
         *          containing information about the audio analysis. If the promise is
         *          rejected, it contains an error object. Not returned if a callback is given.
         */
        getAudioAnalysisForTrack(trackId: string): Promise<ApiResponse<AudioAnalysisResponse>>
        getAudioAnalysisForTrack(trackId: string, callback: CallbackFn<AudioAnalysisResponse>): void
        /**
         * Get audio features for multiple tracks identified by their unique Spotify ID.
         * @param {string[]} trackIds The track IDs
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getAudioFeaturesForTracks(['38P3Q4QcdjQALGF2Z92BmR', '2HO2bnoMrpnZUbUqiilLHi']).then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object
         *          containing information about the audio features for the tracks. If the promise is
         *          rejected, it contains an error object. Not returned if a callback is given.
         */
        getAudioFeaturesForTracks(trackIds: string[]): Promise<ApiResponse<MultipleAudioFeaturesResponse>>
        getAudioFeaturesForTracks(trackIds: string[], callback: CallbackFn<MultipleAudioFeaturesResponse>): void

        /**
         * Create a playlist-style listening experience based on seed artists, tracks and genres.
         * @param {Object} [options] The options supplied to this request.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getRecommendations({ min_energy: 0.4, seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'], min_popularity: 50 }).then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
         *          a list of tracks and a list of seeds. If rejected, it contains an error object. Not returned if a callback is given.
         */
        getRecommendations(options: RecommendationsOptionsObject): Promise<ApiResponse<RecommendationsFromSeedsResponse>>
        getRecommendations(options: RecommendationsOptionsObject, callback: CallbackFn<RecommendationsFromSeedsResponse>): void

        /**
         * Retrieve a list of available genres seed parameter values for recommendations.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example getAvailableGenreSeeds().then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
         *          a list of available genres to be used as seeds for recommendations.
         *          If rejected, it contains an error object. Not returned if a callback is given.
         */
        getAvailableGenreSeeds(): Promise<ApiResponse<AvailableGenreSeedsResponse>>
        getAvailableGenreSeeds(callback: CallbackFn<AvailableGenreSeedsResponse>): void

        /**
         * Retrieve a URL where the user can give the application permissions.
         * @param {string[]} scopes The scopes corresponding to the permissions the application needs.
         * @param {string} state A parameter that you can use to maintain a value between the request and the callback to redirect_uri.It is useful to prevent CSRF exploits.
         * @param {boolean} showDialog A parameter that you can use to force the user to approve the app on each login rather than being automatically redirected.
         * @returns {string} The URL where the user can give application permissions.
         */
        createAuthorizeURL(scopes: string[], state: string, showDialog?: boolean): string

        /**
         * Retrieve the tracks that are saved to the authenticated users Your Music library.
         * @param {Object} [options] Options, being market, limit, and/or offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which in turn contains
         *          playlist track objects. Not returned if a callback is given.
         */
        getMySavedTracks(options: SearchOptions): Promise<ApiResponse<UsersSavedTracksResponse>>
        getMySavedTracks(options: SearchOptions, callback: CallbackFn<UsersSavedTracksResponse>): void

        /**
         * Check if one or more tracks is already saved in the current Spotify user’s “Your Music” library.
         * @param {string[]} trackIds The track IDs
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
         * of the returned array's elements correspond to the track ID in the request.
         * The boolean value of true indicates that the track is part of the user's library, otherwise false.
         * Not returned if a callback is given.
         */
        containsMySavedTracks(trackIds: string[]): Promise<ApiResponse<CheckUsersSavedTracksResponse>>
        containsMySavedTracks(trackIds: string[], callback: CallbackFn<CheckUsersSavedTracksResponse>): void

        /**
         * Remove a track from the authenticated user's Your Music library.
         * @param {string[]} trackIds The track IDs
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error.
         * Not returned if a callback is given.
         */
        removeFromMySavedTracks(trackIds: string[]): Promise<ApiResponse<RemoveUsersSavedTracksResponse>>
        removeFromMySavedTracks(trackIds: string[], callback: CallbackFn<RemoveUsersSavedTracksResponse>): void

        /**
         * Add a track from the authenticated user's Your Music library.
         * @param {string[]} trackIds The track IDs
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error. Not returned if a callback is given.
         */
        addToMySavedTracks(trackIds: string[]): Promise<ApiResponse<SaveTracksForUserResponse>>
        addToMySavedTracks(trackIds: string[], callback: CallbackFn<SaveTracksForUserResponse>): void

        /**
         * Remove an album from the authenticated user's Your Music library.
         * @param {string[]} albumIds The album IDs
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error.
         * Not returned if a callback is given.
         */
        removeFromMySavedAlbums(albumIds: string[]): Promise<ApiResponse<RemoveAlbumsForUserResponse>>
        removeFromMySavedAlbums(albumIds: string[], callback: CallbackFn<RemoveAlbumsForUserResponse>): void

        /**
         * Add an album from the authenticated user's Your Music library.
         * @param {string[]} albumIds The track IDs
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error. Not returned if a callback is given.
         */
        addToMySavedAlbums(albumIds: string[]): Promise<ApiResponse<SaveAlbumsForUserResponse>>
        addToMySavedAlbums(albumIds: string[], callback: CallbackFn<SaveAlbumsForUserResponse>): void

        /**
         * Retrieve the albums that are saved to the authenticated users Your Music library.
         * @param {Object} [options] Options, being market, limit, and/or offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which in turn contains
         *          playlist album objects. Not returned if a callback is given.
         */
        getMySavedAlbums(options: SearchOptions): Promise<ApiResponse<UsersSavedAlbumsResponse>>
        getMySavedAlbums(options: SearchOptions, callback: CallbackFn<UsersSavedAlbumsResponse>): void

        /**
         * Check if one or more albums is already saved in the current Spotify user’s “Your Music” library.
         * @param {string[]} albumIds The album IDs
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
         * of the returned array's elements correspond to the album ID in the request.
         * The boolean value of true indicates that the album is part of the user's library, otherwise false.
         * Not returned if a callback is given.
         */
        containsMySavedAlbums(albumIds: string[]): Promise<ApiResponse<CheckUserSavedAlbumsResponse>>
        containsMySavedAlbums(albumIds: string[], callback: CallbackFn<CheckUserSavedAlbumsResponse>): void

        /**
         * Get the current user's top artists based on calculated affinity.
         * @param {Object} [options] Options, being time_range, limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of artists,
         *          otherwise an error. Not returned if a callback is given.
         */
        getMyTopArtists(options: TopArtistsTracksOptions): Promise<ApiResponse<UsersTopArtistsResponse>>
        getMyTopArtists(options: TopArtistsTracksOptions, callback: CallbackFn<UsersTopArtistsResponse>): void

        /**
         * Get the current user's top tracks based on calculated affinity.
         * @param {Object} [options] Options, being time_range, limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        getMyTopTracks(options: TopArtistsTracksOptions): Promise<ApiResponse<UsersTopTracksResponse>>
        getMyTopTracks(options: TopArtistsTracksOptions, callback: CallbackFn<UsersTopTracksResponse>): void

        /**
         * Get the Current User's Recently Played Tracks
         * @param {Object} [options] Options, being type, after, limit, before.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        getMyRecentlyPlayedTracks(options?: RecentlyPlayedOptions): Promise<ApiResponse<CursorBasedPagingObject<PlayHistoryObject>>>
        getMyRecentlyPlayedTracks(options: RecentlyPlayedOptions, callback: CallbackFn<CursorBasedPagingObject<PlayHistoryObject>>): void

        /**
         * Get the Current User's Connect Devices
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        getMyDevices(): Promise<ApiResponse<any>>
        getMyDevices(callback: CallbackFn<any>): void

        /**
         * Get the Current User's Currently Playing Track.
         * @param {Object} [options] Options, being market.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        getMyCurrentPlayingTrack(options?: AlbumArtistTrackOptions): Promise<ApiResponse<CurrentlyPlayingResponse>>
        getMyCurrentPlayingTrack(options: AlbumArtistTrackOptions, callback: CallbackFn<CurrentlyPlayingResponse>): void

        /**
         * Get the Current User's Current Playback State
         * @param {Object} [options] Options, being market.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        getMyCurrentPlaybackState(options?: AlbumArtistTrackOptions): Promise<ApiResponse<CurrentlyPlayingContextResponse>>
        getMyCurrentPlaybackState(options: AlbumArtistTrackOptions, callback: CallbackFn<CurrentlyPlayingContextResponse>): void

        /**
         * Transfer a User's Playback
         * @param {Object} [options] Options, being market.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        transferMyPlayback(options: TransferPlaybackOptions): Promise<ApiResponse<{}>>
        transferMyPlayback(options: TransferPlaybackOptions, callback: CallbackFn<{}>): void

        /**
         * Starts o Resumes the Current User's Playback
         * @param {Object} [options] Options, being device_id, context_uri, offset, uris.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example play({context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr'}).then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        play(options?: PlayOptions): Promise<ApiResponse<{}>>
        play(options: PlayOptions, callback: CallbackFn<{}>): void

        /**
         * Pauses the Current User's Playback
         * @param {Object} [options] Options, for now device_id,
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example pause().then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        pause(options?: PlaybackOptions): Promise<ApiResponse<{}>>
        pause(options: PlaybackOptions, callback: CallbackFn<{}>): void

        /**
         * Skip the Current User's Playback To Previous Track
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example playbackPrevious().then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        skipToPrevious(): Promise<ApiResponse<{}>>
        skipToPrevious(callback: CallbackFn<{}>): void

        /**
         * Skip the Current User's Playback To Next Track
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example playbackNext().then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        skipToNext(): Promise<ApiResponse<{}>>
        skipToNext(callback: CallbackFn<{}>): void
        /**
         * Seeks to the given position in the user’s currently playing track.
         *
         * @param {number} positionMs The position in milliseconds to seek to. Must be a positive number.
         * @param {Object} options A JSON object with options that can be passed.
         * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
         * one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Object} Null if a callback is provided, a `Promise` object otherwise
         */
        seek(positionMs: number, options?: PlaybackOptions): Promise<ApiResponse<{}>>
        seek(positionMs: number, options: PlaybackOptions, callback: CallbackFn<{}>): void
        /**
         * Set Repeat Mode On The Current User's Playback
         * @param {Object} [options] Options, being state (track, context, off).
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example playbackRepeat({state: 'context'}).then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        setRepeat(options: RepeatShuffleOptions): Promise<ApiResponse<{}>>
        setRepeat(options: RepeatShuffleOptions, callback: CallbackFn<{}>): void
        /**
         * Set Shuffle Mode On The Current User's Playback
         * @param {Object} [options] Options, being state (true, false).
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example playbackShuffle({state: 'false'}).then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves into a paging object of tracks,
         *          otherwise an error. Not returned if a callback is given.
         */
        setShuffle(options: RepeatShuffleOptions): Promise<ApiResponse<{}>>
        setShuffle(options: RepeatShuffleOptions, callback: CallbackFn<{}>): void

        /**
         * Set the volume for the user’s current playback device.
         *
         * @param {number} volumePercent The volume to set. Must be a value from 0 to 100 inclusive.
         * @param {Object} options A JSON object with options that can be passed.
         * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
         * one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Object} Null if a callback is provided, a `Promise` object otherwise
         */
        setVolume(volumePercent: number, options?: PlaybackOptions): Promise<ApiResponse<{}>>
        setVolume(volumePercent: number, options: PlaybackOptions, callback: CallbackFn<{}>): void

        /**
         * Add the current user as a follower of one or more other Spotify users.
         * @param {string[]} userIds The IDs of the users to be followed.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example followUsers(['thelinmichael', 'wizzler']).then(...)
         * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        followUsers(userIds: string[]): Promise<ApiResponse<{}>>
        followUsers(userIds: string[], callback: CallbackFn<{}>): void
        /**
         * Add the current user as a follower of one or more artists.
         * @param {string[]} artistIds The IDs of the artists to be followed.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example followArtists(['0LcJLqbBmaGUft1e9Mm8HV', '3gqv1kgivAc92KnUm4elKv']).then(...)
         * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        followArtists(artistIds: string[]): Promise<ApiResponse<{}>>
        followArtists(artistIds: string[], callback: CallbackFn<{}>): void

        /**
         * Remove the current user as a follower of one or more other Spotify users.
         * @param {string[]} userIds The IDs of the users to be unfollowed.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example unfollowUsers(['thelinmichael', 'wizzler']).then(...)
         * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        unfollowUsers(userIds: string[]): Promise<ApiResponse<{}>>
        unfollowUsers(userIds: string[], callback: CallbackFn<{}>): void

        /**
         * Remove the current user as a follower of one or more artists.
         * @param {string[]} artistIds The IDs of the artists to be unfollowed.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example unfollowArtists(['0LcJLqbBmaGUft1e9Mm8HV', '3gqv1kgivAc92KnUm4elKv']).then(...)
         * @returns {Promise|undefined} A promise that if successful, simply resolves to an empty object. If rejected,
         *          it contains an error object. Not returned if a callback is given.
         */
        unfollowArtists(artistIds: string[]): Promise<ApiResponse<{}>>
        unfollowArtists(artistIds: string[], callback: CallbackFn<{}>): void

        /**
         * Check to see if the current user is following one or more other Spotify users.
         * @param {string[]} userIds The IDs of the users to check if are followed by the current user.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example isFollowingUsers(['thelinmichael', 'wizzler']).then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
         *          of the returned array's elements correspond to the users IDs in the request.
         *          The boolean value of true indicates that the user is following that user, otherwise is not.
         *          Not returned if a callback is given.
         */
        isFollowingUsers(userIds: string[]): Promise<ApiResponse<{}>>
        isFollowingUsers(userIds: string[], callback: CallbackFn<{}>): void

        /**
         * Get the current user's followed artists.
         * @param {Object} [options] Options, being after and limit.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which contains
         * album objects. Not returned if a callback is given.
         */
        getFollowedArtists(options?: FollowedArtistsOptions): Promise<ApiResponse<CursorBasedPagingObject<ArtistObjectFull>>>
        getFollowedArtists(options: FollowedArtistsOptions, callback: CallbackFn<CursorBasedPagingObject<ArtistObjectFull>>): void

        /**
         * Check if users are following a playlist.
         * @param {string} userId The playlist's owner's user ID
         * @param {string} playlistId The playlist's ID
         * @param {String[]} User IDs of the following users
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful returns an array of booleans. If rejected,
         * it contains an error object. Not returned if a callback is given.
         */
        areFollowingPlaylist(userId: string, playlistId: string, followerIds: string[]): Promise<ApiResponse<boolean[]>>
        areFollowingPlaylist(userId: string, playlistId: string, followerIds: string[], callback: CallbackFn<boolean[]>): void

        /**
         * Check to see if the current user is following one or more artists.
         * @param {string[]} artistIds The IDs of the artists to check if are followed by the current user.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @example isFollowingArtists(['0LcJLqbBmaGUft1e9Mm8HV', '3gqv1kgivAc92KnUm4elKv']).then(...)
         * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
         *          of the returned array's elements correspond to the artists IDs in the request.
         *          The boolean value of true indicates that the user is following that artist, otherwise is not.
         *          Not returned if a callback is given.
         */
        isFollowingArtists(artistIds: string[]): Promise<ApiResponse<boolean[]>>
        isFollowingArtists(artistIds: string[], callback: CallbackFn<boolean[]>): void

        /**
         * Retrieve new releases
         * @param {Object} [options] Options, being country, limit and/or offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which contains
         * album objects. Not returned if a callback is given.
         */
        getNewReleases(options?: AlbumArtistTrackOptions & PaginationOptions): Promise<ApiResponse<ListOfNewReleasesResponse>>
        getNewReleases(options: AlbumArtistTrackOptions & PaginationOptions, callback: CallbackFn<ListOfNewReleasesResponse>): void

        /**
         * Retrieve featured playlists
         * @param {Object} [options] Options, being country, locale, timestamp, limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which contains
         * featured playlists. Not returned if a callback is given.
         */
        getFeaturedPlaylists(options?: FeaturedPlaylistsOptions): Promise<ApiResponse<ListOfFeaturedPlaylistsResponse>>
        getFeaturedPlaylists(options: FeaturedPlaylistsOptions, callback: CallbackFn<ListOfFeaturedPlaylistsResponse>): void

        /**
         * Retrieve a list of categories used to tag items in Spotify (e.g. in the 'Browse' tab)
         * @param {Object} [options] Options, being country, locale, limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object of categories.
         * Not returned if a callback is given.
         */
        getCategories(options?: FeaturedPlaylistsOptions): Promise<ApiResponse<MultipleCategoriesResponse>>
        getCategories(options: FeaturedPlaylistsOptions, callback: CallbackFn<MultipleCategoriesResponse>): void

        /**
         * Retrieve a category.
         * @param {string} categoryId The id of the category to retrieve.
         * @param {Object} [options] Options, being country, locale.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a category object.
         * Not returned if a callback is given.
         */
        getCategory(categoryId: string, options?: AlbumArtistTrackOptions): Promise<ApiResponse<CategoryObject>>
        getCategory(categoryId: string, options: AlbumArtistTrackOptions, callback: CallbackFn<CategoryObject>): void

        /**
         * Retrieve playlists for a category.
         * @param {string} categoryId The id of the category to retrieve playlists for.
         * @param {Object} [options] Options, being country, limit, offset.
         * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
         * @returns {Promise|undefined} A promise that if successful, resolves to a paging object containing simple playlists.
         * Not returned if a callback is given.
         */
        getPlaylistsForCategory(categoryId: string, options?: FeaturedPlaylistsOptions): Promise<ApiResponse<PagingObject<PlaylistObjectSimplified>>>
        getPlaylistsForCategory(categoryId: string, options: FeaturedPlaylistsOptions, callback: CallbackFn<PagingObject<PlaylistObjectSimplified>>): void
    }
}
