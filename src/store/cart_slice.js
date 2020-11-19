import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type stateShape = {
  cart: { [string]: Array<string> },
};

const initialState: stateShape = {
  cart: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    //This override existing cart
    addCart(
      state: stateShape,
      action: PayloadAction<{ id: string, data?: ?Array<string> }>
    ) {
      state.cart[action.payload.id] = action.payload.data ?? [];
    },

    removeCart(state: stateShape, action: PayloadAction<string>) {
      if (action.payload) {
        delete state.cart[action.payload];
      }
    },

    addProductToCart(
      state: stateShape,
      action: PayloadAction<{ id: string, data: Array<string> }>
    ) {
      if (state.cart[action.payload.id]) {
        state.cart[action.payload.id].push(action.payload.data);
      } else {
        state.cart[action.payload.id] = action.payload.data;
      }
    },

    removeProductFromCart(
      state: stateShape,
      action: PayloadAction<{ id: string, productId: string }>
    ) {
      if (state.cart[action.payload.id]) {
        state.cart[action.payload.id] = state.cart[action.payload.id].filter(
          (id) => id !== action.payload.data
        );
      }
    },
  },
});

export const {
  addCart,
  removeCart,
  addProductToCart,
  removeProductFromCart,
} = cartSlice.actions;

export default cartSlice.actions;
export const checkoutReducer = cartSlice.reducer;
