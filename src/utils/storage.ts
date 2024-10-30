import {StorageKeys} from '../constants';
import {getData, setData} from '../services/storage';

const readString = async (key: StorageKeys, defaultValue: string): Promise<string> => {
  const result = await getData(StorageKeys[key]);
  return result === null ? defaultValue : result;
};

const writeString = async (key: StorageKeys, value: string): Promise<void> => {
  return await setData(StorageKeys[key], value);
};

const readInteger = async (key: StorageKeys, defaultValue: number): Promise<number> => {
  const result = await getData(StorageKeys[key]);
  return result === null ? defaultValue : parseInt(result, 10);
};

const writeInteger = async (key: StorageKeys, value: number): Promise<void> => {
  // eslint-disable-next-line no-bitwise
  return await setData(StorageKeys[key], (value | 0).toString());
};

const readJson = async (key: StorageKeys, defaultValue: object): Promise<object> => {
  const result = await getData(StorageKeys[key]);
  return result === null ? defaultValue : JSON.parse(result);
};

const writeJson = async (key: StorageKeys, value: object): Promise<void> => {
  const stringValue = JSON.stringify(value);
  return await setData(StorageKeys[key], stringValue);
};

export {readString, writeString, readInteger, writeInteger, readJson, writeJson};
