import React from 'react';
import { AppRegistry, Text } from 'react-native';
import App from './src/App.js';
import { name as appName } from './app.json';
import {
  MagicProvider,
  RedundantGlobalLoading,
} from 'rn-ecommerce-simiconnector';

const Index = () => {
  return (
    <MagicProvider>
      <RedundantGlobalLoading />
      <App />
    </MagicProvider>
  );
};

AppRegistry.registerComponent(appName, () => Index);
