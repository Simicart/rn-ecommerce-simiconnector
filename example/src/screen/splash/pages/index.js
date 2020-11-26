import React, { useState, useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useAppContext } from 'rn-ecommerce-simiconnector';
import { MerchantConfig } from 'rn-ecommerce-simiconnector';
import { isObjectTruthy } from 'rn-ecommerce-simiconnector';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashPage() {
  const [storeId, setStoreId] = useState('default');
  const [currencyCode, setCurrencyCode] = useState(undefined);
  const [showMerchant, setShowMerchant] = useState(false);

  const [{ merchant_config }, { changeStack }] = useAppContext();

  const getStorageData = async () => {
    const store = await AsyncStorage.getItem('store_id');
    const currency = await AsyncStorage.getItem('currency_code');
    return { store, currency };
  };

  useMemo(() => {
    if (!isObjectTruthy(merchant_config)) {
      return;
    }
    const { base } = merchant_config;
    if (!base) {
      return;
    }

    AsyncStorage.setItem('store_id', base.store_id);
    AsyncStorage.setItem('currency_code', base.currency_code);
  }, [merchant_config]);

  useEffect(() => {
    const { store, currency } = getStorageData();
    if (store) {
      setStoreId(store);
    }
    if (currency) {
      setCurrencyCode(currency);
    }
    setShowMerchant(true);
  }, []);

  useEffect(() => {
    if (isObjectTruthy(merchant_config)) {
      changeStack('main');
    }
  }, [merchant_config]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 33 }}>Welcome</Text>
      {showMerchant && (
        <MerchantConfig storeId={storeId} currencyCode={currencyCode} />
      )}
    </View>
  );
}

export default SplashPage;
