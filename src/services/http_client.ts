// Abstraction for http requests
// This module is just responsible for making a HTTP request and returning the result.
// All possible errors are captured here so that try/catch blocks are not necessary when used

import {JSON_stringify} from '../utils/converters';

const DEFAULT_TIMEOUT = 8000;

enum RequestType {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

enum HttpCode {
  // Standard HTTP codes
  SUCCESS = 200,
  SUCCESS1 = 201,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  // Custom HTTP codes to indicate errors
  BAD_RESPONSE = -1,
  NO_INTERNET = -2,
  UNKNOWN = -4,
}

type ErrorCodeName = Record<number, string>;

const errorCodeNames: ErrorCodeName = {
  [HttpCode.NO_INTERNET]: 'No internet connection.',
  [HttpCode.BAD_RESPONSE]: 'Something went wrong. Try again',
  [HttpCode.NOT_FOUND]: 'Not found.',
  [HttpCode.UNKNOWN]: 'Unknown error',
};

export type MapHeader = Record<string, string>;

class APIRequest {
  type: RequestType = RequestType.GET;
  fullUrl: string = '';
  body?: string;
  extraHeaders?: MapHeader;
  timeout?: number;

  constructor(
    type: RequestType,
    fullUrl: string,
    body?: string,
    extraHeaders?: MapHeader,
    authToken?: string,
    timeout?: number,
  ) {
    this.type = type;
    this.fullUrl = fullUrl;
    this.body = body;
    this.extraHeaders = extraHeaders;
    this.timeout = timeout ?? DEFAULT_TIMEOUT;
  }
}

class APIResponse {
  success: boolean = false;
  statusCode: number = 0;
  result?: string;
  headers?: MapHeader;

  constructor(success: boolean, statusCode: number, result?: string, headers?: MapHeader) {
    this.success = success;
    this.statusCode = statusCode;
    this.result = result;
    this.headers = headers;
  }
}

const BAD_RESPONSE = new APIResponse(false, HttpCode.BAD_RESPONSE, errorCodeNames[HttpCode.BAD_RESPONSE]);

class HTTPClient {
  getRequestHeaders(request: APIRequest) {
    // Default headers
    const headers: MapHeader = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    if (request.extraHeaders !== undefined) {
      Object.keys(request.extraHeaders).forEach(header => (headers[header] = request.extraHeaders![header] ?? ''));
    }
    return headers;
  }

  getResponseHeaders(response: Response) {
    const headerMap: MapHeader = {};
    response.headers.forEach((value: string, key: string) => (headerMap[key] = value));
    return headerMap;
  }

  async request(request: APIRequest) {
    let response = null;
    try {
      const controller = new AbortController();
      const abortTimerId = setTimeout(() => controller.abort(), request.timeout ?? DEFAULT_TIMEOUT);
      const requestOptions = {
        method: request.type,
        headers: this.getRequestHeaders(request),
        body: request.body ?? null,
        signal: controller.signal,
      };
      console.log(request);
      console.log(JSON_stringify(requestOptions, undefined, 2));
      response = await fetch(request.fullUrl, requestOptions);

      clearTimeout(abortTimerId);
    } catch (_) {
      return BAD_RESPONSE;
    }
    if (response === null) return BAD_RESPONSE;

    const statusCode = response.status;
    const responseHeaders = this.getResponseHeaders(response);

    let responseBody = '';
    try {
      responseBody = await response.text();
    } catch (_) {}

    if (!(statusCode >= HttpCode.SUCCESS && statusCode <= HttpCode.SUCCESS1)) {
      return new APIResponse(false, statusCode, responseBody, responseHeaders);
    }

    return new APIResponse(true, statusCode, responseBody, responseHeaders);
  }
}

export {HTTPClient, APIRequest, APIResponse, RequestType, HttpCode};
