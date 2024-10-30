// navigation types can be improved by following https://reactnavigation.org/docs/typescript/#organizing-types

import {Routes} from './routes';

export type RootStackParamList = {
  [Routes.Intro]: undefined;
  [Routes.Settings]: undefined;
  [Routes.Login]: undefined;
};
