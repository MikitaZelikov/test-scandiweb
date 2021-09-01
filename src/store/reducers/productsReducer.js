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
    return { data, activeCategory };
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
        duplState.productsList = action.payload.data.data.category.products;
        duplState.allCategories = action.payload.data.data.categories;
        duplState.allCurrencies = action.payload.data.data.allCurrencies;
        duplState.activeCategory = action.payload.activeCategory;
      });
  },
});

// export const { toggleCategory } = productsSlice.actions;
export default productsSlice.reducer;
