import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from '../tab';

import { AppNavigation } from '@/shared/lib/navigation';
import HomeStack from '../stack/HomeStack';

const Stack = createNativeStackNavigator();

export default function Service() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AppNavigation.TAB.ROOT}>
      <Stack.Screen name={AppNavigation.TAB.ROOT} component={TabNavigator} />
      <Stack.Screen name={AppNavigation.HOME_STACK.ROOT} component={HomeStack} />
    </Stack.Navigator>
  );
}
