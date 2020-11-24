import React, { useEffect, useState } from 'react';
import { Keyboard, Text, View, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { dateToString } from '../../../utils/dateToString.js';
import { stringToDate } from '../../../utils/stringToDate.js';

function DateTime(props) {
  const { value, title, handleChange: _handleChange } = props;
  const [show: boolean, setShow] = useState(false);
  const date: Date = value ? stringToDate(value) : new Date(1603818000000);
  const mode: string = 'date';

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    _handleChange(dateToString(date));
  }, []);

  const handleChange = (event, selectedDate: Date): void => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    _handleChange(dateToString(currentDate));
  };
  //
  const showDatepicker = (): void => {
    setShow(true);
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.title}>{title || 'Select date'}</Text>
      <View style={styles.dateContainer}>
        <Text
          testID={'date_input/date_text'}
          onPress={showDatepicker}
          style={styles.dateText}
        >
          {dateToString(date)}
        </Text>
      </View>
      {show && (
        <DateTimePicker
          testID={'dateTimePicker'}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 5,
    marginBottom: 7,
  },
  title: {
    fontSize: 16,
  },
  dateContainer: {
    marginBottom: 7,
    borderBottomColor: '#28df99',
    borderBottomWidth: 1,
    marginLeft: 20,
    width: 100,
    justifyContent: 'flex-end',
  },
  dateText: {
    marginTop: 5,
    width: 100,
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 2,
    paddingBottom: 0,
  },
});

export { DateTime };
