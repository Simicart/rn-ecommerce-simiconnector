import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  orderHistory: [],
  addresses: [],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    setLotsOfDataFromServer(state, action: PayloadAction<{}>) {
      state = { ...state, ...action.payload };
    },

    setLogIn(state) {
      state.isLoggedIn = true;
    },

    setLoggedOut(state) {
      // cart id?
      state.isLoggedIn = false;
    },

    addOrderHistory(state, action: PayloadAction<{}>) {
      state.orderHistory.push(action.payload);
      //  request to server
    },

    removeAllOrderHistory(state) {
      state.orderHistory = [];
      //  request to server
    },

    addAddress(state, action: PayloadAction<{}>) {
      state.addresses.push(action.payload);
      //  request to server
    },

    removeAllAddress(state) {
      state.addresses = [];
      //  request to server
    },
  },
});

export const {
  setLoggedOut,
  setLogIn,
  setLotsOfDataFromServer,
  addAddress,
  addOrderHistory,
  removeAllAddress,
  removeAllOrderHistory,
} = customerSlice.actions;

export default customerSlice.reducer;
export const customerReducer = customerSlice.reducer;
