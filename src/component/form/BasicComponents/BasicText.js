import React, { useCallback, useEffect, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { fieldType } from '../fieldType.js';

function BasicText(props) {
  const inputRef = useRef(null);
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
      inputRef.focus();
    }
  }, [isFocused]);

  return (
    <View>
      <TextInput
        ref={inputRef}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
        returnKeyType={returnKeyType}
        keyboardType={resolveInputType(type)}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

export { BasicText };
