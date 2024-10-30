// Abstraction for making HTTP API requests.
// This module is responsible for injecting authentication tokens into all API requests, renewing tokens and
// retrying requests if necessary

import {API_BASE_URL, StorageKeys} from '../constants';
import {APIResponse, HTTPClient, HttpCode, MapHeader, RequestType} from '../services/http_client';
import {readString, writeString} from './storage';
import {JSON_parse} from './converters';

const RESPONSE_UNAUTHORIZED = new APIResponse(false, HttpCode.UNAUTHORIZED, 'unauthorized');
const DEFAULT_HEADERS: MapHeader = {'Content-Type': 'application/json'};

interface IJWTPayload {
  iat: number;
  exp: number;
}

interface IAuthRefresh {
  authRefresh: {
    token: string;
    refreshToken: string;
  };
}

type ApiErrorHandler = (message: string) => void;

const httpClient = new HTTPClient();

const getAccessToken = (tokenPair: string) => tokenPair.split('\t')[0];
const getRefreshToken = (tokenPair: string) => tokenPair.split('\t')[1];

const isTokenValid = (tokenPair: string): boolean => {
  const accessToken = getAccessToken(tokenPair);
  const jwtParts = accessToken.split('.');
  const payloadB64 = jwtParts[1];
  const payloadString = atob(payloadB64);
  const payloadOrError = JSON_parse(payloadString);
  if (!payloadOrError) return false;
  const payload = payloadOrError as IJWTPayload;
  const issueTime = new Date(payload.iat * 1000);
  issueTime.setMinutes(issueTime.getMinutes() + 15); // +15 minutes
  const expiryTime = issueTime;
  const now = new Date();
  return now > expiryTime;
};

// Returns an access and refresh token pair or empty string if refresh failed
const refreshTokens = async (tokenPair: string): Promise<string> => {
  const refreshToken = getRefreshToken(tokenPair);

  const request = {
    type: RequestType.POST,
    fullUrl: `${API_BASE_URL}/api/jsonql`,
    DEFAULT_HEADERS,
    body: JSON.stringify({authRefresh: {refreshToken: refreshToken}}),
  };

  const apiResponse = await httpClient.request(request);
  if (!apiResponse.success) return '';

  const result = JSON_parse(apiResponse.result ?? '');
  if (!result) return '';

  const authRefresh = (result as IAuthRefresh).authRefresh;
  const newTokenPair = `${authRefresh.token}\t${authRefresh.refreshToken}`;
  await writeString(StorageKeys.AUTH_TOKEN_PAIR, newTokenPair);
  return newTokenPair;
};

// Performs a generic fetch request with authentication token handling
const jsonFetch = async (
  requestType: RequestType,
  url: string,
  data: object | null,
  onError: ApiErrorHandler | null,
  isAuthenticated: boolean = true,
): Promise<APIResponse | null> => {
  const headers: MapHeader = Object.assign({}, DEFAULT_HEADERS);

  let authTokenPair = '';
  if (isAuthenticated) {
    authTokenPair = await readString(StorageKeys.AUTH_TOKEN_PAIR, '');
    if (!isTokenValid(authTokenPair)) {
      const newTokenPair = await refreshTokens(authTokenPair);
      if (!newTokenPair) return RESPONSE_UNAUTHORIZED;
      authTokenPair = newTokenPair;
    }

    if (authTokenPair) headers.Authorization = `Bearer ${getAccessToken(authTokenPair)}`;
  }

  const request = {
    type: requestType,
    fullUrl: `${API_BASE_URL}${url}`,
    headers,
    body: JSON.stringify(data),
  };

  let apiResponse = await httpClient.request(request);
  // if success return result
  if (apiResponse.success) return apiResponse;

  // Check if issue due to token expired try renewing and calling API again
  if (apiResponse.statusCode === HttpCode.UNAUTHORIZED) {
    const newTokenPair = await refreshTokens(authTokenPair);
    if (!newTokenPair) return RESPONSE_UNAUTHORIZED;
    headers.Authorization = `Bearer ${getAccessToken(newTokenPair)}`;

    const newRequest = {...request, headers};
    const newResponse = await httpClient.request(newRequest);
    if (newResponse.success) return newResponse;
    apiResponse = newResponse;
  }

  if (typeof onError === 'function') onError(apiResponse.result ?? '');
  return null;
};

export const apiPost = async (
  url: string,
  data: object | null,
  onError: ApiErrorHandler | null,
  isAuthenticated: boolean = true,
): Promise<APIResponse | null> => {
  return jsonFetch(RequestType.POST, url, data, onError, isAuthenticated);
};

export const apiGet = async (
  url: string,
  onError: ApiErrorHandler | null,
  isAuthenticated: boolean = true,
): Promise<APIResponse | null> => {
  return jsonFetch(RequestType.GET, url, null, onError, isAuthenticated);
};

/*
const GRAPHQL_URL = ''

export const apiGraphql = async (
  query: string,
  variables?: object,
): Promise<ApiResponse> => {
  // TODO: Pass API token through header if user is authenticated
  const headers = { 'Content-Type': 'application/json' }

  const gqlRequest = { query, variables: variables ?? null }

  const apiResponse = await jsonPost(GRAPHQL_URL, {
    headers,
    body: JSON.stringify(gqlRequest),
  })

  if (apiResponse.status === ApiStatus.OK) {
    if (apiResponse.result?.data) {
      return apiResponse
    }
    if (apiResponse.result?.errors) {
      return {
        status: ApiStatus.ERROR,
        result: apiResponse?.result?.errors?.message ?? 'Unknown error',
      }
    }
  }

  // handle other situations
  if (apiResponse.status === ApiStatus.NO_AUTH) {
    //TODO:JS access token has expired.  renew token and try API call again
  }

  // For erros, maybe just flash a message on the screen
  if (apiResponse.status === ApiStatus.NO_NETWORK) {
    return {
      status: apiResponse.status,
      result: 'No network connectivity',
    }
  }

  // all other situations, show generic message
  return {
    status: apiResponse.status,
    result: 'Could not connect to server',
  }
}
*/
