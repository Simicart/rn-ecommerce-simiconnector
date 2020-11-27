import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { fieldType } from '../fieldType.js';

function BasicText(props) {
  const [inputRef, setInputRef] = useState(null);
  const {
    onBlur,
    onChangeText,
    value,
    returnKeyType,
    onSubmitEditing,
    editable,
    isFocused,
    type,
    secureTextEntry = false,
  } = props;

  const resolveInputType = useCallback((type: string): string => {
    switch (type) {
      case fieldType.TEXT:
        return 'default';
      case fieldType.EMAIL:
        return 'email-address';
      default:
        return 'default';
    }
  }, []);

  useEffect(() => {
    if (isFocused && inputRef && editable) {
      // inputRef.focus();
    }
  }, [isFocused]);

  return (
    <View>
      <TextInput
        ref={(input) => setInputRef(input)}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
        returnKeyType={returnKeyType}
        keyboardType={resolveInputType(type)}
        secureTextEntry={secureTextEntry}
      />
      <Text>{props.error ?? 'No error'}</Text>
    </View>
  );
}

export { BasicText };
