import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
SplashScreen.preventAutoHideAsync();
const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaded] = useFonts({
    regular: require('../../../assets/fonts/GeneralSans-Regular.otf'),
    bold: require('../../../assets/fonts/GeneralSans-Bold.otf'),
    medium: require('../../../assets/fonts/GeneralSans-Medium.otf'),
    semibold: require('../../../assets/fonts/GeneralSans-Semibold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  if (Platform.OS === 'android') {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>{children}</NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default NavigationProvider;
