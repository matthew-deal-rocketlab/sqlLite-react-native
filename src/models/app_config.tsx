import React, {createContext, useContext, useState} from 'react';

const newAppConfigModel = {
  isDarkmode: false,
  languageCode: 'en',

  setIsDarkmode: (_: boolean) => {},
  setLanguageCode: (_: string) => {},
};

const AppConfigContext = createContext(newAppConfigModel);

export type TAppConfigModel = typeof newAppConfigModel;

export const useAppConfigModel = () => useContext(AppConfigContext);

export const AppConfigContextProvider = ({children}: {children: JSX.Element}) => {
  const [_isDarkmode, _setIsDarkmode] = useState(newAppConfigModel.isDarkmode);
  const [_languageCode, _setLanguageCode] = useState(newAppConfigModel.languageCode);

  const values: TAppConfigModel = {
    isDarkmode: _isDarkmode,
    setIsDarkmode: _setIsDarkmode,
    languageCode: _languageCode,
    setLanguageCode: _setLanguageCode,
  };

  return <AppConfigContext.Provider value={values}>{children}</AppConfigContext.Provider>;
};
