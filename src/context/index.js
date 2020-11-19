import React from 'react';
import { BaseUrlProvider } from '../network';
import { appContextProvider, useAppContext } from './appContext.js';
import { cartContextProvider, useCartContext } from './cartContext.js';
import { catalogContextProvider, useCatalogContext } from './catalogContext.js';
import {
  checkoutContextProvider,
  useCheckoutContext,
} from './checkoutContext.js';
import {
  customerContextProvider,
  useCustomerContext,
} from './customerContext.js';
import { BaseStoreProvider } from '../store';

const contextList = [
  BaseStoreProvider,
  BaseUrlProvider,
  appContextProvider,
  catalogContextProvider,
  checkoutContextProvider,
  customerContextProvider,
  cartContextProvider,
];

const MagicProvider = (props) => {
  const { children } = props;

  return contextList.reduceRight((current, Provider) => {
    return <Provider>{current}</Provider>;
  }, children);
};

export {
  MagicProvider,
  useCustomerContext,
  useCheckoutContext,
  useCatalogContext,
  useAppContext,
  useCartContext,
};
