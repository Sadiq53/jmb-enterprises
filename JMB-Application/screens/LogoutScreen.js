import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const logout = async () => {
      try {
        // Remove the token from AsyncStorage
        await AsyncStorage.removeItem('UserToken');
        // Navigate to the login screen after logout
        navigation.replace('Login');
      } catch (error) {
        console.error('Error clearing the token', error);
      }
    };

    // Call the logout function when the screen is mounted
    logout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;
