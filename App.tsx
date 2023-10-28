import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingPage from './app/presentation/SettingPage';
import HomePage from './app/presentation/HomePage';
import TodoDetail from './app/presentation/TodoDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="TodoDetail"
          component={TodoDetail}
          options={{ title: 'Details' }}
        />
        <Stack.Screen
          name="SettingPage"
          component={SettingPage}
          options={{ title: 'Setting' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
