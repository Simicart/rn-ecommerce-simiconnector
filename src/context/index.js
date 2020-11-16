import React from 'react';
import { appContextProvider, useAppContext } from './appContext.js';
import { catalogContextProvider, useCatalogContext } from './catalogContext.js';
import {
  checkoutContextProvider,
  useCheckoutContext,
} from './checkoutContext.js';
import {
  customerContextProvider,
  useCustomerContext,
} from './customerContext.js';

const contextList = [
  appContextProvider,
  catalogContextProvider,
  checkoutContextProvider,
  customerContextProvider,
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
};
