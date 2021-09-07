import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiGraphql from '../../api/api-graphql';

const initialState = {
  productsAreLoading: false,
  initialDataIsLoading: true,
  productsList: [],
  allCategories: [],
  activeCategory: null,
  allCurrencies: [],
  activeCurrency: null,
  cart: [],
  size: '',
};

export const loadInitData = createAsyncThunk(
  'data/loadInitData', () => apiGraphql.getInitData(),
);

export const commonSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      const duplState = state;
      duplState.activeCategory = action.payload;
    },
    setCurrency: (state, action) => {
      const duplState = state;
      duplState.activeCurrency = action.payload;
    },
    addProductToCart: (state, action) => {
      const duplState = state;
      duplState.cart.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInitData.fulfilled, (state, action) => {
        const duplState = state;
        duplState.allCategories = action.payload.categories;
        duplState.allCurrencies = action.payload.currencies;
        duplState.activeCategory = duplState.allCategories[0].name;
        duplState.activeCurrency = duplState.allCurrencies[0];
        duplState.initialDataIsLoading = false;
      });
  },
});

export const { setCategory, setCurrency, addProductToCart } = commonSlice.actions;
export default commonSlice.reducer;
