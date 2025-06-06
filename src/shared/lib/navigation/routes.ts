export const AppNavigation = {
  SPLASH_SCREEN: 'SplashScreen',
  SERVICE: 'Service',
  AUTH: {},
  TAB: {
    ROOT: 'Tab',
    HOME: 'Home',
    GROUPS: 'Groups',
    CHAT: 'TabChat',
    GOALS: 'Goals',
  },
  HOME_STACK: {
    ROOT: 'HomeStack',
    CHAT: 'Chat',
  },
} as const;

export type AppNavigationParams = {
  [AppNavigation.SPLASH_SCREEN]: undefined;
  [AppNavigation.SERVICE]: undefined;
  [AppNavigation.TAB.ROOT]: undefined;
  [AppNavigation.TAB.HOME]: undefined;
  [AppNavigation.HOME_STACK.ROOT]: {
    screen: keyof typeof AppNavigation.HOME_STACK;
  };
  [AppNavigation.HOME_STACK.CHAT]: undefined;
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends AppNavigationParams {}
  }
}
