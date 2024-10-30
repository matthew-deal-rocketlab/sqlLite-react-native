import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SettingsPage, IntroPage, LoginPage} from '../pages';

import {RootStackParamList} from './types';
import {Routes} from './routes';

const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={Routes.Intro}
        screenOptions={{headerShown: false, animationEnabled: false}}>
        <RootStack.Screen name={Routes.Intro as never} component={IntroPage} />
        <RootStack.Screen name={Routes.Settings} component={SettingsPage} />
        <RootStack.Screen name={Routes.Login} component={LoginPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
