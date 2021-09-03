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

// export const loadProducts = createAsyncThunk(
//   'data/loadProducts',
//   async (activeCategory) => {
//     const data = await apiGraphql.getData(activeCategory);
//     return { data, activeCategory };
//   },
// );

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
  },
  extraReducers: (builder) => {
    builder
      // .addCase(loadProducts.pending, (state) => {
      //   const duplState = state;
      //   duplState.productsAreLoading = true;
      // })
      // .addCase(loadProducts.fulfilled, (state, action) => {
      //   const duplState = state;
      //   duplState.productsAreLoading = false;
      //   duplState.productsList = action.payload.data.data.category.products;
      // })
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

export const { setCategory, setCurrency } = commonSlice.actions;
export default commonSlice.reducer;
