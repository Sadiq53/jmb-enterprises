// ModuleScreen.js
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '../context/AuthContext';
import AppNavigator from '../navigation/AppNavigator'
import AuthNavigator from '../navigation/AuthNavigator'
import { useDispatch } from 'react-redux';
import { handleGetData } from '../redux/UserDataSlice';

const ModuleScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('UserToken');
        setIsLoggedIn(!!userToken); // Convert token to boolean
      } catch (error) {
        console.error('Failed to retrieve token from AsyncStorage', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    dispatch(handleGetData())
    checkToken();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <AuthProvider>
        {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        {/* <AppNavigator />/ */}
    </AuthProvider>
  );
};

export default ModuleScreen;
