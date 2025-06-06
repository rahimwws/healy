import RootStack from '@/app';
import { enableScreens, enableFreeze } from 'react-native-screens';
enableScreens();
enableFreeze();
export default function App() {
  return <RootStack />;
}
