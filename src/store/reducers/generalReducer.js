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
  dropdownCartIsOpened: false,
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
          duplState.cart = currentCart;
        } else duplState.cart.push(action.payload);
      } else duplState.cart.push(action.payload);
    },
    setProductAmount: (state, action) => {
      const duplState = state;
      const currentCart = state.cart;
      const { amount, id } = action.payload;
      const neededProduct = currentCart.find((item) => item.additionalId === id);
      const indexNeededProduct = currentCart.findIndex((item) => item.additionalId === id);
      neededProduct.amount = amount;
      currentCart.splice(indexNeededProduct, 1, neededProduct);
      duplState.cart = currentCart;
    },
    toggleDropdownCart: (state) => {
      const duplState = state;
      duplState.dropdownCartIsOpened = !duplState.dropdownCartIsOpened;
    },
    deleteProductFromCart: (state, action) => {
      const duplState = state;
      const currentCart = state.cart;
      const indexDelProduct = currentCart.findIndex((item) => item.additionalId === action.payload);
      currentCart.splice(indexDelProduct, 1);
      duplState.cart = currentCart;
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

export const {
  setCategory,
  setCurrency,
  addProductToCart,
  setProductAmount,
  toggleDropdownCart,
  deleteProductFromCart,
} = commonSlice.actions;
export default commonSlice.reducer;
