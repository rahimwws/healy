import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { useThemeStore } from './themeStore';

export const useTheme = () => {
  const { theme, colors, toggleTheme, initializeTheme } = useThemeStore();
  const systemTheme = useColorScheme();

  useEffect(() => {
    initializeTheme('light');
  }, [systemTheme, initializeTheme]);

  return {
    theme,
    colors,
    toggleTheme,
    isDark: theme === 'dark',
  };
};
