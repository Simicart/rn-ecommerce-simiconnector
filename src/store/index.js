import { configureStore } from '@reduxjs/toolkit';
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

const store = configureStore({
  reducer: reducer,
});

export default store;
export { store };
