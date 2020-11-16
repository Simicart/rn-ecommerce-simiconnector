import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Home')}
        style={{ marginTop: 20, marginLeft: 15 }}
      >
        <Text>Home</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
