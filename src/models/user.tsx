import React, {createContext, useContext, useState} from 'react';
import {UserCtrl} from '../controllers/user';

interface IUserDetails {
  firstname: string;
  email: string;
  token: string;
}

const newUserModel = {
  userDetails: {
    firstname: '',
    email: '',
    token: '',
  } as IUserDetails,

  setUserDetails: (_: IUserDetails) => {},
  isAuthenticated: (): boolean => false,
  actions: (): UserCtrl => new UserCtrl(),
};

const UserContext = createContext(newUserModel);

export type TUserModel = typeof newUserModel;

export const useUserModel = () => useContext<TUserModel>(UserContext);

export const UserContextProvider = ({children}: {children: JSX.Element}) => {
  const [_userDetails, _setUserDetails] = useState(newUserModel.userDetails);

  const values: TUserModel = {
    userDetails: _userDetails,
    setUserDetails: _setUserDetails,
    isAuthenticated: () => !!_userDetails.token,
    actions: () => new UserCtrl(values),
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
