import React from 'react';
import { AppRegistry, Text } from 'react-native';
import App from './src/App.js';
import { name as appName } from './app.json';
import { MagicProvider, BaseStoreProvider } from 'rn-ecommerce-simiconnector';

const Index = () => {
  return (
    <BaseStoreProvider>
      <MagicProvider>
        <App />
      </MagicProvider>
    </BaseStoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => Index);
