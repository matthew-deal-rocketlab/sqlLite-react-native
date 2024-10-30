// Be sure to make native background color to match with the command ./run update-app-splash 508aa8
export const SPLASH_BACKGROUND_COLOR = '#508aa8';

export enum StorageKeys {
  AUTH_TOKEN_PAIR, // The access and refresh tokens stored as a pair separated by a tab character.
  USER_NAME,
  USER_EMAIL,
}

// All possible API results that this application will deal with
export enum ApiStatus {
  OK,
  ERROR,
  NO_AUTH,
  TIMEOUT,
  NO_NETWORK,
  UNKNOWN,
}

export const API_KEY = 'c37861c7-7414-4a40-bbd8-3343662e4483';
// export const API_BASE_URL = 'https://js-rocket-org.github.io/static-api' // no trailing slash
export const API_BASE_URL = 'https://rlwm.rokt.io/api';

export const FormInputSetter: Function = (_fn: Function) => {};
