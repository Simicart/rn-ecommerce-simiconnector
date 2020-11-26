import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  orderHistory: [],
  addresses: [],
  email: '',
  password: '',
  hashed_password: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    setLotsOfDataFromServer(state, action: PayloadAction<{}>) {
      state = { ...state, ...action.payload };
    },

    setLoggedIn(
      state,
      action: PayloadAction<{
        email: string,
        password: string,
        hashed_password: string,
      }>
    ) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.hashed_password = action.payload.hashed_password;
      state.isLoggedIn = true;
    },

    setLoggedOut(state) {
      state.email = '';
      state.password = '';
      state.hashed_password = '';
      state.isLoggedIn = false;
    },

    addOrderHistory(state, action: PayloadAction<{}>) {
      state.orderHistory.push(action.payload);
    },

    removeAllOrderHistory(state) {
      state.orderHistory = [];
    },

    addAddress(state, action: PayloadAction<{}>) {
      state.addresses.push(action.payload);
    },

    removeAllAddress(state) {
      state.addresses = [];
    },
  },
});

export const {
  setLoggedOut,
  setLoggedIn,
  setLotsOfDataFromServer,
  addAddress,
  addOrderHistory,
  removeAllAddress,
  removeAllOrderHistory,
} = customerSlice.actions;

export default customerSlice.actions;
export const customerReducer = customerSlice.reducer;
