// AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={AppNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
