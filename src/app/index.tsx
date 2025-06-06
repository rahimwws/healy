import { createStackNavigator } from '@react-navigation/stack';
import NavigationProvider from './provider/navigation';
import Service from '@/navigation/service';

export type RootStackParamList = {
  Service: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationProvider>
      <Stack.Navigator initialRouteName="Service" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Service" component={Service} />
      </Stack.Navigator>
    </NavigationProvider>
  );
}
