import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRouter from '../route/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}
