import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppRouter from '../route/navigation';
import {
  MagicProvider,
  RedundantGlobalLoading,
} from 'rn-ecommerce-simiconnector';

export default function App() {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}
