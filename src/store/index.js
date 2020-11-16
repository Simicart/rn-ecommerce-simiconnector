import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { appReducer } from './app_slice.js';
import { catalogReducer } from './catalog_slice.js';
import { checkoutReducer } from './checkout_slice.js';
import { customerReducer } from './customer.js';

const reducer = combineReducers({
  app: appReducer,
  catalog: catalogReducer,
  checkout: checkoutReducer,
  customer: customerReducer,
});

const baseStore = configureStore({
  reducer: reducer,
});

export default baseStore;
export { baseStore };

export const BaseStoreProvider = (props) => {
  const { children } = props;

  return <Provider store={baseStore}>{children}</Provider>;
};
