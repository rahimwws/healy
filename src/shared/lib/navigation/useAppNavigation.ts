import { useNavigation, type NavigationProp } from '@react-navigation/native';

import { AppNavigation, AppNavigationParams } from './routes';

type ExtractRoutes<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object ? ExtractRoutes<T[K]> : T[K];
    }[keyof T]
  : never;

export type AppParamList = {
  [K in ExtractRoutes<typeof AppNavigation>]: Record<string, string | boolean | object> | undefined;
};

type AppNavigationProp = NavigationProp<AppNavigationParams>;

export const useAppNavigation = (): AppNavigationProp => {
  return useNavigation<AppNavigationProp>();
};
