import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainNavigation from './routes/main';
import {lightTheme, darkTheme} from './theme';
import {SplashPage} from './pages/splash';
import {useAppConfigModel, AppConfigContextProvider} from './models/app_config';
import {UserContextProvider} from './models/user';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {initDatabase} from './services/database';

SQLite.enablePromise(true);
export let db: SQLiteDatabase;

export const initDB = async () => {
  db = await SQLite.openDatabase({
    name: 'blog.db',
    location: 'default',
  });
  return db;
};

const InnerApp = () => {
  const {isDarkmode} = useAppConfigModel();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
        <StatusBar barStyle={isDarkmode ? 'dark-content' : 'light-content'} />
        <MainNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

//  Show the splash page before anything else begins
const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    setTimeout(async () => {
      await initDB();
      await initDatabase();
      setIsReady(true);
    }, 0);
  }, []);

  return !isReady ? (
    <SplashPage />
  ) : (
    <AppConfigContextProvider>
      <UserContextProvider>
        <InnerApp />
      </UserContextProvider>
    </AppConfigContextProvider>
  );
};

export default App;
