import { createStackNavigator } from '@react-navigation/stack';

import { CreateName } from '@/screens';

const Stack = createStackNavigator();

export default function GroupStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CreateName" component={CreateName} />
    </Stack.Navigator>
  );
}
