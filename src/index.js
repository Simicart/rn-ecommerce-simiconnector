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
  useProduct,
  useFetch,
  useLazyFetch,
  useBaseURLFromContext,
  useLazyFetchWithProvider,
} from './network/index.js';

export { RedundantGlobalLoading } from './component/index.js';
export { useFetchWithProvider } from './network/index.js';
