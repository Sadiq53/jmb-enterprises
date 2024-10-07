// App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import ModuleScreen from './screens/ModuleScreen';
import UserDataSlice from './redux/UserDataSlice';
import { NavigationContainer } from '@react-navigation/native';


const rootReducer = combineReducers({UserDataSlice});
const store = configureStore({
  reducer : rootReducer
});


export default function App() {
  return (
    <NavigationContainer>
    <Provider store={store}>
      <ModuleScreen />
    </Provider>
    </NavigationContainer>
  );
}
