import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import {
  useAppContext,
  useProduct,
  useAppConfig,
} from 'rn-ecommerce-simiconnector';
import {} from '../../../../src/hooks';
import { config_provider_endpoint, products_endpoint } from './endpoints.js';
import { config_provider_secret } from './secret.js';

function TestGlobalLoading(props) {
  const [appState, appApi] = useAppContext();
  const { setGlobalLoading, unsetGlobalLoading } = appApi;
  const { baseURL } = appState;

  // const {data, loading, error} = useProduct({
  //   endPoint: products_endpoint,
  // });

  const { data, loading, error } = useAppConfig({
    endPoint: config_provider_endpoint,
    token: config_provider_secret,
  });

  return (
    <View>
      <Text>Something rendered</Text>
      <Text>{baseURL ?? 'oh no'}</Text>
      <Text>{data && !loading && JSON.stringify(data)}</Text>

      <Button title={'start'} onPress={setGlobalLoading} />
      <Button title={'remove'} onPress={unsetGlobalLoading} />
    </View>
  );
}

export { TestGlobalLoading };
