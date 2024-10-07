// context/AuthContext.js
import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    // Replace this with your actual API call http://localhost:8080/admin/login
    const response = await fetch('https://jmb-server.onrender.com/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

   const data = await response.json()
  //  console.log(data)
   if (data.status === 200) {
     // Assuming a successful login sets some state or token
     setIsAuthenticated(true);
     AsyncStorage.setItem('UserToken', data?.token)
    } else {
      throw new Error('Failed to log in');
    }
    

  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
