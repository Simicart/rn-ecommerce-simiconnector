import React, { useCallback, useEffect } from 'react';
import { Keyboard, Text, View, StyleSheet } from 'react-native';
import { Picker as CommunityPicker } from '@react-native-picker/picker';

function Picker(props) {
  const {
    title,
    value,
    handleChange: _handleChange,
    pickerKeyForSave,
    pickerKeyForDisplay,
    picker_data,
  } = props;

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    const possible_values = picker_data.map((x) => x[pickerKeyForSave]);
    if (picker_data.length === 0 || possible_values.indexOf(value) === -1) {
      handleChange('');
    }
  }, []);

  const handleChange = useCallback(
    (data, index) => {
      _handleChange(data);
    },
    [_handleChange]
  );

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <CommunityPicker
        selectedValue={value}
        style={styles.picker}
        onValueChange={handleChange}
      >
        {picker_data.map((data, index: number) => {
          return (
            <Picker.Item
              key={index}
              label={data[pickerKeyForDisplay]}
              value={data[pickerKeyForSave]}
            />
          );
        })}
      </CommunityPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 7,
    paddingBottom: 0,
  },
  picker: {
    height: 50,
    width: 160,
    paddingBottom: 0,
    marginBottom: 2,
  },
});

export { Picker };
