import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import {
  useAppContext,
  Banner,
  Home as HomePage,
} from 'rn-ecommerce-simiconnector';
import type {} from 'rn-ecommerce-simiconnector';
import {} from './endpoints.js';
import {} from './secret.js';

function TestGlobalLoading(props) {
  return (
    <ScrollView>
      <Text>Something rendered</Text>
      <HomePage
        endPoint={
          'https://louis.pwa-commerce.com/simiconnector/rest/v2/homes/lite/'
        }
      />
      <Text>Something rendered</Text>
    </ScrollView>
  );
}

export { TestGlobalLoading };
