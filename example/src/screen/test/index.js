import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Home as HomePage,
  useFetch,
  useAppContext,
} from 'rn-ecommerce-simiconnector';
import type {} from 'rn-ecommerce-simiconnector';

function TestGlobalLoading(props) {
  // const {data} = useFetch({
  //     endPoint: 'https://louis.pwa-commerce.com/simiconnector/rest/v2/homeproductlists/9'
  // });

  return (
    <ScrollView>
      <View style={{ height: 50 }} />
      <HomePage />
    </ScrollView>
  );
}

export { TestGlobalLoading };
