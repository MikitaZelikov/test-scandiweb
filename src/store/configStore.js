import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';

const rootReducer = combineReducers({
  productsData: productsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
