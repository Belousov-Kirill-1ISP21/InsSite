import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import policiesReducer from './slices/policiesSlice';
import clientsReducer from './slices/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    policies: policiesReducer,
    clients: clientsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;