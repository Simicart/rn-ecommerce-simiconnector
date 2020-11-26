import React, { useEffect } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import {
  Home as HomePage,
  useFetch,
  useFetchWithProvider,
  useLazyFetchWithProvider,
  useAppContext,
  useCustomerContext,
  useLazyFetch,
} from 'rn-ecommerce-simiconnector';
import type {} from 'rn-ecommerce-simiconnector';

function TestGlobalLoading(props) {
  const [
    { email, password, hashed_password },
    { logIn, logOut },
  ] = useCustomerContext();

  const [request, { data }] = useLazyFetchWithProvider({
    endPoint:
      'https://louis.pwa-commerce.com/simiconnector/rest/v2/homeproductlists/9',
    initialGetParams: {
      x: '1',
    },
  });

  return (
    <ScrollView>
      <View style={{ height: 90 }} />
      <Text style={{ fontSize: 50 }}>
        {JSON.stringify(data ?? {}).slice(0, 100) ?? 'such empty'}
      </Text>
      <Button title={'req'} onPress={request} />
      <Button title={'out'} onPress={logOut} />
      {/*<Text style={{fontSize: 50}}>{password ?? 'such empty'}</Text>*/}
      {/*<Text style={{fontSize: 50}}>{hashed_password ?? 'such empty'}</Text>*/}
      {/*<HomePage/>*/}
    </ScrollView>
  );
}

export { TestGlobalLoading };
