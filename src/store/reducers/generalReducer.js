import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiGraphql from '../../api/api-graphql';

const initialState = {
  initialDataIsLoading: true,
  productsList: [],
  allCategories: [],
  activeCategory: null,
  allCurrencies: [],
  activeCurrency: null,
  cart: [],
  isOverlay: false,
};

export const loadInitData = createAsyncThunk(
  'data/loadInitData', () => apiGraphql.getInitData(),
);

export const commonSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setCurrency: (state, action) => {
      state.activeCurrency = action.payload;
    },
    addProductToCart: (state, action) => {
      const currentCart = state.cart;
      if (currentCart.length !== 0) {
        const selectedProdAttributes = action.payload.attributes;
        const identicalNameProds = currentCart.filter((item) => item.name === action.payload.name);
        let identicalProds;
        if (identicalNameProds) {
          identicalProds = identicalNameProds.find((prod) => {
            const res = prod.attributes.reduce(
              (prevValue, attr, index) => {
                if (attr.value === selectedProdAttributes[index].value) return prevValue + 1;
                return prevValue + 0;
              }, 0);
            return res === prod.attributes.length ? prod : false;
          });
        }
        if (identicalProds) {
          identicalProds.amount += 1;
          const indexIdenticalProds = currentCart.findIndex((elem) => elem.additionalId
            === identicalProds.additionalId);
          currentCart.splice(indexIdenticalProds, 1, identicalProds);
          state.cart = currentCart;
        } else {
          state.cart.push(action.payload);
        }
      } else {
        state.cart.push(action.payload);
      }
    },
    setProductAmount: (state, action) => {
      const currentCart = state.cart;
      const { amount, id } = action.payload;
      const neededProduct = currentCart.find((item) => item.additionalId === id);
      const indexNeededProduct = currentCart.findIndex((item) => item.additionalId === id);
      neededProduct.amount = amount;
      currentCart.splice(indexNeededProduct, 1, neededProduct);
      state.cart = currentCart;
    },
    toggleOverlay: (state) => {
      debugger;
      state.isOverlay = !state.isOverlay;
    },
    deleteProductFromCart: (state, action) => {
      const currentCart = state.cart;
      const indexDelProduct = currentCart.findIndex((item) => item.additionalId === action.payload);
      currentCart.splice(indexDelProduct, 1);
      state.cart = currentCart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInitData.fulfilled, (state, action) => {
        state.allCategories = action.payload.categories;
        state.allCurrencies = action.payload.currencies;
        state.activeCategory = state.allCategories[0].name;
        state.activeCurrency = state.allCurrencies[0];
        state.initialDataIsLoading = false;
      });
  },
});

export const {
  setCategory,
  setCurrency,
  addProductToCart,
  setProductAmount,
  toggleOverlay,
  deleteProductFromCart,
} = commonSlice.actions;
export default commonSlice.reducer;
