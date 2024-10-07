import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import IndexScreen from '../screens/IndexScreen';
import LogoutScreen from '../screens/LogoutScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import AuthNavigator from '../navigation/AuthNavigator'
import StatusDetails from '../screens/StatusDetails';

const AppNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={IndexScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="LogOut" 
        component={LogoutScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="VehicleDetails" 
        component={VehicleDetailsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={AuthNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="statusDetails" 
        component={StatusDetails} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
