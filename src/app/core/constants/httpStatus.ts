export enum httpStatus {
	/*************************
	 *      2xx Success      *
	 *************************/

	OK = 200, //                          * Success
	UPDATED = 200, //                     * PUT/PATCH Requests
	CREATED = 201, //                     * Create new entity
	ACCEPTED = 202,
	NO_CONTENT = 204,
	DELETED = 204, //                     * DELETE requests

	/*************************
	 *   4xx Client Error    *
	 *************************/

	BAD_REQUEST = 400, //                 * A bad request
	UNAUTHORIZED = 401, //                *
	FORBIDDEN = 403, //                   *
	NOT_FOUND = 404, //                   * Endpoint not found
	NOT_ACCEPTABLE = 406,
	REQUEST_TIMEOUT = 408, //             *
	CONFLICT = 409,
	REQUEST_ENTITY_TOO_LARGE = 413,

	/*************************
	 *   5xx Server Error    *
	 *************************/

	INTERNAL_SERVER_ERROR = 500, //       * Server error
}
