import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RnEcommerceSimiconnector from 'rn-ecommerce-simiconnector';

export default function App() {
  return (
    <View style={styles.container}>
      <RnEcommerceSimiconnector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
