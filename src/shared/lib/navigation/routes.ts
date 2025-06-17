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
  GROUP_STACK: {
    ROOT: 'GroupStack',
    CREATE_NAME: 'CreateName',
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
  [AppNavigation.GROUP_STACK.ROOT]: {
    screen: keyof typeof AppNavigation.GROUP_STACK;
  };
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends AppNavigationParams {}
  }
}
