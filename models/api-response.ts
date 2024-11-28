export interface ApiResponse<T> {
    /**
     *
     * @type {boolean}
     * @memberof ApiResponse
     */
    isSuccess?: boolean;
    /**
     *
     * @type {string}
     * @memberof ApiResponse
     */
    message?: string | null;
    /**
     *
     * @type {T}
     * @memberof ApiResponse
     */
    data?: T | null;
    /**
     *
     * @type {number}
     * @memberof ApiResponse
     */
    errorCode?: number | null;
}
