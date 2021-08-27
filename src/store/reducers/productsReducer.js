import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiGraphql from '../../api/api-graphql';

const initialState = {
  isLoading: false,
  productsList: [],
  allCategories: [],
  activeCategory: 'clothes',
  allCurrencies: [],
  activeCurrency: 'USD',
  cart: [],
  size: '',
};

export const loadProducts = createAsyncThunk(
  'products/getProducts',
  async (activeCategory) => {
    const data = await apiGraphql.findData(activeCategory);
    return data;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  // reducers: {

  // },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        const duplState = state;
        duplState.isLoading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        const duplState = state;
        duplState.isLoading = false;
        duplState.productsList = action.payload.data.category.products;
        duplState.allCategories = action.payload.data.categories;
        duplState.allCurrencies = action.payload.data.allCurrencies;
      });
  },
});

export default productsSlice.reducer;
