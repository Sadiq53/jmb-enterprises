// screens/HomeScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/images/logo.png';

export default function HomeScreen() {
  const { logout } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleLogout = () => {
    logout();
    AsyncStorage.removeItem('UserToken');
    navigation.replace('Login');
  };

  const handleLogin = async () => {
    setLoading(true); // Start loading
    setError(''); // Reset error message
    try {
      await login(username, password); // Attempt login with username and password
      navigation.replace('Home'); // On successful login, navigate to Home
    } catch (e) {
      setError('Login failed. Please try again.'); // Set error message on failure
      console.error('Login error:', e);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
     <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null} // Ensures keyboard avoidance for iOS and Android
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
    <View style={styles.indexGrid}>
    <Image source={logo} style={styles.image} />
    </View>
    <View style={styles.bottomLayout}>
      <View style={styles.bottomHead}>
        <Text style={styles.myFont}>Login</Text>
      </View>
      <View style={styles.formLayout}>
        <Text style={styles.formText}>Email</Text>
        <TextInput placeholder='Enter email id' value={username}
        onChangeText={setUsername}
        autoCapitalize="none" placeholderTextColor="gray" style={styles.formInput} />

        <Text style={styles.formText}>Password</Text>
        <TextInput placeholder='Enter password'  value={password}
        onChangeText={setPassword}
        secureTextEntry placeholderTextColor="gray" style={styles.formInput} />
      </View>
     
      <TouchableOpacity onPress={handleLogin} style={styles.formButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
     
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexGrid: {
    flex : 1,
    gap : 0,
    // flexDirection : "row",
    padding : 20,
    justifyContent  :"center",
    alignItems : "center",
    
  },
  myFont : {
    fontSize : 40,
    color : "#fff",
    fontWeight : "600",
    textAlign : "center"

  },
  image : {
    width : 120,
    height : 100
  },
  bottomLayout : {
    backgroundColor : "red",
    flex : 0.2,
    borderTopLeftRadius : 35,
    borderTopRightRadius : 35,
    paddingHorizontal : 20,
    paddingVertical : 40,
    gap :40,
    // paddingBottom : 0
  },
  bottomHead : {
    textAlign : "center",
    flex : 0
  },
  formLayout : {
    flex : 0.8,
    gap : 8,
  },
  formText : {
    fontSize : 20,
    color : "#fff"
  },
  formInput : {
    backgroundColor  :"#fff",
    height : 50,
    borderRadius : 5,
    paddingHorizontal : 20,
    // paddingVertical : 20
    flex : 1
  },
  formButton : {
    backgroundColor : "yellow",
    padding : 10,
    borderRadius : 6,
    flex : 0
  },
  buttonText : {
    color : "black",
    textAlign : "center",
    fontSize : 20,
    paddingVertical : 4,
    fontFamily : "Poppins",
    fontWeight : "700"  
  }
});
