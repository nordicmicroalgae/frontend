

export class HttpError extends Error {

  constructor(response) {
    super(response.statusText);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.name = this.constructor.name;
    this.response = response;
    this.status = response.status;
  }

  toJSON() {
    return {name: this.name, status: this.status, message: this.message};
  }

}

// Status codes: 4xx Client Errors
HttpError.BAD_REQUEST = 400;
HttpError.UNAUTHORIZED = 401;
HttpError.PAYMENT_REQUIRED = 402;
HttpError.FORBIDDEN = 403;
HttpError.NOT_FOUND = 404;
HttpError.METHOD_NOT_ALLOWED = 405;
HttpError.NOT_ACCEPTABLE = 406;
HttpError.PROXY_AUTHENTICATION_REQUIRED = 407;
HttpError.REQUEST_TIMEOUT = 408;
HttpError.CONFLICT = 409;
HttpError.GONE = 410;
HttpError.LENGTH_REQUIRED = 411;
HttpError.PRECONDITION_FAILED = 412;
HttpError.PAYLOAD_TO_LARGE = 413;
HttpError.URI_TOO_LONG = 414;
HttpError.UNSUPPORTED_MEDIA_TYPE = 415;
HttpError.RANGE_NOT_SATISFIABLE = 416;
HttpError.EXPECTATION_FAILED = 417;
HttpError.IM_A_TEAPOT = 418;
HttpError.MISDIRECTED_REQUEST = 421;
HttpError.UNPROCESSABLE_ENTITY = 422;
HttpError.LOCKED = 423;
HttpError.FAILED_DEPENDENCY = 424;
HttpError.TOO_EARLY = 425;
HttpError.UPGRADE_REQUIRED = 426;
HttpError.PRECONDITION_REQUIRED = 428;
HttpError.TOO_MANY_REQUESTS = 429;
HttpError.REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
HttpError.UNAVAILABLE_FOR_LEGAL_REASONS = 451;

// Status codes: 5xx Server Errors
HttpError.INTERNAL_SERVER_ERROR = 500;
HttpError.NOT_IMPLEMENTED = 501;
HttpError.BAD_GATEWAY = 502;
HttpError.SERVICE_UNAVAILABLE = 503;
HttpError.GATEWAY_TIMEOUT = 504;
HttpError.HTTP_VERSION_NOT_SUPPORTED = 505;
HttpError.VARIANT_ALSO_NEGOTIATES = 506;
HttpError.INSUFFICIENT_STORAGE = 507;
HttpError.LOOP_DETECTED = 508;
HttpError.NOT_EXTENDED = 510;
HttpError.NETWORK_AUTHENTICATION_REQUIRED = 511;
