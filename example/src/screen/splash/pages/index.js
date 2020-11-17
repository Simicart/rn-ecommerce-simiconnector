import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAppContext } from 'rn-ecommerce-simiconnector';
import { baseURL } from '../../test/endpoints.js';
import { merchant_secret } from '../../test/secret.js';

function SplashPage() {
  const [, appApi] = useAppContext();
  const { setBaseURL, setBaseToken } = appApi;

  useEffect(() => {
    setBaseURL(baseURL);
    setBaseToken(merchant_secret);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 33 }}>Splash</Text>
    </View>
  );
}

export default SplashPage;
