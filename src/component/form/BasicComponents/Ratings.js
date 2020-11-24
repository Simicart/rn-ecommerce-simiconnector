import React from 'react';
import { View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

function Ratings(props) {
  const { handleChange, defaultValue } = props;
  return (
    <View>
      <AirbnbRating
        showRating={false}
        size={15}
        defaultRating={defaultValue ?? 0}
        onFinishRating={handleChange}
        selectedColor={'#ffd369'}
      />
    </View>
  );
}

export { Ratings };
