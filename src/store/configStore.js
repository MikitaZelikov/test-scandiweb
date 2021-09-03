import { configureStore, combineReducers } from '@reduxjs/toolkit';
import generalReducer from './reducers/generalReducer';

const rootReducer = combineReducers({
  productsData: generalReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
