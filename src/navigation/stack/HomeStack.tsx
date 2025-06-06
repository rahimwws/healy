import { createStackNavigator } from '@react-navigation/stack';

import { Chat } from '@/screens';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
