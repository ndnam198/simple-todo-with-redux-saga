import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/Store';
import HomePage from './app/feature/todo/presentation/HomePage';
import SettingPage from './app/feature/todo/presentation/SettingPage';
import TodoDetail from './app/feature/todo/presentation/TodoDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
