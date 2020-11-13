import React from 'react';
import { View, Text } from 'react-native';

function SplashPage() {
  setTimeout(function () {

  }, 1000);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 33 }}>Splash</Text>
    </View>
  );
}

export default SplashPage;
