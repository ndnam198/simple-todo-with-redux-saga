import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingPage from './app/presentation/SettingPage';
import HomePage from './app/presentation/HomePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SettingPage" component={SettingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
