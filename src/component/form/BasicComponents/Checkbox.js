import CheckBox from '@react-native-community/checkbox';
import React, { useCallback, useEffect } from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

function Checkbox(props) {
  const { handleChange, isDisabled, value, title } = props;

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    if (value !== '1' && value !== '0') {
      handleChange('0');
    }
  }, []);

  const handleOnPress = useCallback(() => {
    if (value === '0') {
      handleChange('1');
    } else {
      handleChange('0');
    }
  }, [value, handleChange]);

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.innerContainer} onPress={handleOnPress}>
        <View style={styles.checkbox}>
          <CheckBox
            disabled={isDisabled}
            value={value === '1'}
            onValueChange={() => handleOnPress(handleChange)}
          />
        </View>
        <Text style={styles.title}>{title || ''}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 6,
    marginBottom: 6,
  },
  innerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: 'gray',
    flex: 6,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    marginRight: 15,
    flex: 1,
  },
});

export { Checkbox };
