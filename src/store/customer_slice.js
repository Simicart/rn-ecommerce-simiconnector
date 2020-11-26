import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../network/query/fetchData.js';
import { login_endpoint } from '../network/utils/endpoint.js';

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

export const logIn = ({ email, password, baseURL, token }) => async (
  dispatch
) => {
  console.log(email);
  console.log(password);
  const { data, error } = await fetchData({
    endPoint: login_endpoint,
    baseURL: baseURL ?? '',
    headerParams: {
      email: email,
      password: password,
    },
    token: token,
  });

  if (data) {
    const returnData = {
      email: email,
      password: password,
      hashed_password: data?.data?.customer?.simi_hash ?? '',
    };
    dispatch(setLoggedIn(returnData));
    return returnData;
  } else if (error) {
    console.info('Error logging in');
    return { error: error };
  }
};

export const logOut = setLoggedOut;
export default { ...customerSlice.actions, logIn, logOut };
export const customerReducer = customerSlice.reducer;
