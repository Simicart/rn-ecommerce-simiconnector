import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const DefaultSubmitButton = (props: BasicButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

type BasicButtonProps = {
  title: string,
  onPress: () => any,
};

export { DefaultSubmitButton };
