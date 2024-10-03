import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import AdminDataSlice from './redux/AdminDataSlice.js';

const rootReducer = combineReducers({AdminDataSlice});
const store = configureStore({
  reducer : rootReducer
});


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
)
