import * as SystemUI from 'expo-system-ui';
import { ColorSchemeName } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';

import { lightColors, darkColors, ColorsT } from './colors';

export const storage = new MMKV();

interface ThemeState {
  theme: 'light' | 'dark';
  colors: ColorsT;
  toggleTheme: () => void;
  initializeTheme: (systemTheme: ColorSchemeName) => void;
}

const THEME_STORAGE_KEY = '@app_theme';

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  colors: lightColors,

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      storage.set(THEME_STORAGE_KEY, newTheme);
      SystemUI.setBackgroundColorAsync(newTheme === 'light' ? '#FFFFFF' : '#1A1A1A');
      return {
        theme: newTheme,
        colors: newTheme === 'light' ? lightColors : darkColors,
      };
    });
  },

  initializeTheme: (systemTheme) => {
    const savedTheme = storage.getString(THEME_STORAGE_KEY);
    const initialTheme = (savedTheme || systemTheme || 'light') as 'light' | 'dark';

    set({
      theme: initialTheme,
      colors: initialTheme === 'light' ? lightColors : darkColors,
    });

    SystemUI.setBackgroundColorAsync(initialTheme === 'light' ? '#FFFFFF' : '#1A1A1A');
  },
}));
