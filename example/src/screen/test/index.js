import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import {
  useAppContext,
  useFetch,
  useProduct,
  useAppConfig,
  useLazyFetch,
  useFetchWithProvider,
  useLazyFetchWithProvider,
} from 'rn-ecommerce-simiconnector';
import {
  config_provider_endpoint,
  products_endpoint,
  baseURL,
} from './endpoints.js';
import { config_provider_secret } from './secret.js';

function TestGlobalLoading(props) {
  const [appState, appApi] = useAppContext();
  const { setGlobalLoading, unsetGlobalLoading } = appApi;
  const { baseURL } = appState;

  // const {data, loading, error} = useFetch({
  //   baseURL: baseURL,
  //   endPoint: products_endpoint,
  //   token: '123'
  // });

  // const {data, loading, error} = useFetchWithProvider({
  //   endPoint: products_endpoint,
  // });

  const [_request, { data, loading, error }] = useLazyFetchWithProvider({
    endPoint: products_endpoint,
  });
  const request = async () => {
    console.log(await _request());
  };

  //
  // const {data, loading, error} = useProduct({
  //   endPoint: products_endpoint,
  // });
  //

  // const { data, loading, error } = useAppConfig({
  //   endPoint: config_provider_endpoint,
  //   token: config_provider_secret,
  // });

  return (
    <View>
      <Text>Something rendered</Text>
      <Text>{baseURL ?? 'oh no'}</Text>
      <Text>{data && !loading && JSON.stringify(data)}</Text>

      <Button title={'start'} onPress={setGlobalLoading} />
      <Button title={'remove'} onPress={unsetGlobalLoading} />
      <Button title={'request'} onPress={request} />
    </View>
  );
}

export { TestGlobalLoading };
