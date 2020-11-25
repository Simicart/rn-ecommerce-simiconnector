import * as React from 'react';
import { Text } from 'react-native';

export default function App() {
  return <Text style={{ fontSize: 20 }}>Welcome to SimiCart</Text>;
}

export * from './store/index.js';
export * from './context/index.js';
export * from './network/index.js';
export * from './component/index.js';
