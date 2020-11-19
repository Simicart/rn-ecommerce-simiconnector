import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
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

  const [id, setId] = useState(1);

  // const {data, loading, error} = useFetch({
  //   baseURL: baseURL,
  //   endPoint: products_endpoint,
  //   token: '123'
  // });

  // const {data, loading, error} = useFetch({
  //   endPoint: 'https://jsonplaceholder.typicode.com/posts',
  //   initialGetParams: {
  //     id: id
  //   }
  // });

  // const {data, loading, error} = useFetchWithProvider({
  //   endPoint: products_endpoint,
  // });

  // fetch('https://jsonplaceholder.typicode.com/posts?userId=1').
  //     then(response => response.json()).
  //     then(json => console.log(json));
  //

  const [_request, { data, loading, error }] = useLazyFetchWithProvider({
    endPoint: 'https://jsonplaceholder.typicode.com/posts',
    initialGetParams: {
      id: id,
    },
  });

  // const [_request, { data, loading, error }] = useLazyFetchWithProvider({
  //   endPoint: products_endpoint,
  // });

  const request = async () => {
    return await _request();
  };

  useEffect(() => {
    console.log('id ' + id);
    request().then((x) => console.log(x));
  }, [id]);

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
    <ScrollView>
      <Text>Something rendered</Text>

      <Button title={'start'} onPress={setGlobalLoading} />
      <Button title={'remove'} onPress={unsetGlobalLoading} />
      <Button title={'request'} onPress={request} />

      <Button
        title={id.toString()}
        onPress={() => {
          setId((prevState) => prevState + 1);
        }}
      />

      <Text>{data && !loading && JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
}

export { TestGlobalLoading };
