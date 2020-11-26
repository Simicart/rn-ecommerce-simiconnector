import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRouter from '../route/navigation';
import { baseURL } from './screen/test/endpoints';
import { merchant_secret } from './screen/test/secret';
import { useAppContext } from 'rn-ecommerce-simiconnector';

export default function App() {
  const [, { setBaseURL, setBaseToken }] = useAppContext();

  useEffect(() => {
    setBaseURL(baseURL);
    setBaseToken(merchant_secret);
  }, []);

  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}
