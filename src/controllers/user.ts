// authentication related functions
import {NavigationProp} from '@react-navigation/native';

import {StorageKeys} from '../constants';
import {writeString} from '../utils/storage';
import {ApiErrorHandler, apiPost} from '../utils/http_client';
import {JSON_parse} from '../utils/converters';
import {TUserModel} from '../models/user';
import {Routes} from '../routes/routes';

export type LoginResponse = {
  firstname: string;
  token: string;
  refreshToken: string;
};

export class UserCtrl {
  _userModel?: TUserModel;

  constructor(u?: TUserModel) {
    this._userModel = u;
  }

  // Returns true on signin success otherwise false, if false errorHandler is called to provide user feedback
  signIn = async (email: string, pass: string, errorHandler: ApiErrorHandler | null): Promise<boolean> => {
    const requestBody = {authLogin: {email, pass}};
    const response = await apiPost('/jsonql', requestBody, errorHandler, false);
    if (response === null) return false;

    const loginData = JSON_parse(response.result ?? '') as {
      authLogin: LoginResponse | string;
    };
    if (!loginData || typeof loginData.authLogin === 'string') {
      const errorMessage = typeof loginData.authLogin === 'string' ? loginData.authLogin : 'Unknown error';
      if (typeof errorHandler === 'function') errorHandler(errorMessage);
      return false;
    }

    const loginDetails = loginData.authLogin;

    const tokenPair = `${loginDetails.token}\t${loginDetails.refreshToken}`;

    this._userModel?.setUserDetails({firstname: loginDetails.firstname, email: email.toLowerCase(), token: tokenPair});

    await writeString(StorageKeys.AUTH_TOKEN_PAIR, tokenPair);
    await writeString(StorageKeys.USER_NAME, loginDetails.firstname);

    return true;
  };

  signOut = async (navigation: NavigationProp<ReactNavigation.RootParamList>) => {
    await writeString(StorageKeys.AUTH_TOKEN_PAIR, '');
    await writeString(StorageKeys.USER_NAME, '');

    this._userModel?.setUserDetails({firstname: '', email: '', token: ''});

    navigation.reset({index: 0, routes: [{name: Routes.Login as never}]});
  };
}
