// General functions that convert inputs of one type to another if they do not fit into
// the formatters or encryptors category

import {Buffer} from 'buffer';

// Base64 functions.  This is slow replace with a native package
export const atob = (input: string) => Buffer.from(input, 'base64').toString('ascii');

export const btoa = (input: string) => Buffer.from(input, 'base64');

// Predictable JSON converters.  Will not throw errors you either get result or empty string
export const JSON_parse = (input: string): string | object => {
  let result = '';
  try {
    result = JSON.parse(input);
  } catch (_) {}
  return result;
};

export const JSON_stringify = (
  input: any,
  replacer?: ((this: any, key: string, value: any) => any) | undefined,
  space?: string | number | undefined,
) => {
  let result = '';
  try {
    result = JSON.stringify(input, replacer, space);
  } catch (_) {}
  return result;
};
