import * as React from 'react';
import { Text } from 'react-native';

export default function App() {
  return <Text style={{ fontSize: 20 }}>Welcome to SimiCart</Text>;
}

export { baseStore, BaseStoreProvider } from './store/index.js';
export { MagicProvider } from './context/index.js';
export {
  useAppContext,
  useCatalogContext,
  useCheckoutContext,
  useCustomerContext,
} from './context/index.js';

export {
  useAppConfig,
  useLoading,
  useCategory,
  useFetch,
  useProduct,
  useLazyFetch,
} from './network/index.js';
