import { AppNavigation } from '@/shared/lib/navigation';
import { Group, Home } from '@/screens';
import { useTheme } from '@/shared/lib/theme';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Easing, TouchableOpacity, View } from 'react-native';
import { GroupSvg, Heart, Wellness } from '@/shared/assets';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Haptic from 'expo-haptics';
import { TransitionPresets } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={AppNavigation.TAB.HOME}
      screenOptions={{
        lazy: false,
        freezeOnBlur: true,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'medium',
        },
        ...TransitionPresets.FadeTransition,
        tabBarButton(props: BottomTabBarButtonProps) {
          return (
            <TouchableOpacity
              onPressIn={() => Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)}
              onPress={props.onPress}
              accessibilityState={props.accessibilityState}
              accessibilityRole={props.accessibilityRole}
              style={props.style}>
              {props.children}
            </TouchableOpacity>
          );
        },
        tabBarStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name={AppNavigation.TAB.HOME}
        component={Home}
        options={{
          tabBarActiveTintColor: colors.status.success,
          tabBarIcon: ({ focused }) => (
            <Wellness fill={focused ? colors.status.success : colors.primary.lightGray} />
          ),
        }}
      />
      <Tab.Screen
        name={AppNavigation.TAB.GROUPS}
        component={Group}
        options={{
          tabBarActiveTintColor: colors.primary.blue,
          tabBarIcon: ({ focused }) => (
            <GroupSvg fill={focused ? colors.primary.blue : colors.primary.lightGray} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
