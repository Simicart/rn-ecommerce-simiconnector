import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function Banner(props: BannerProps) {
  const { data, loading } = props;
  const carouselRef = useRef(null);

  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={{ flex: 1 }}>
        <ParallaxImage
          source={{ uri: item.uri }}
          containerStyle={{
            width: screenWidth - 10,
            height: 200,
          }}
          style={{}}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  if (loading) {
    return <View style={{ height: 200 }} />;
  }

  return (
    <>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={_renderItem}
        containerCustomStyle={{ flex: 1 }}
        slideStyle={{
          marginLeft: 1,
        }}
        hasParallaxImages={true}
        sliderWidth={screenWidth}
        itemWidth={screenHeight - 10}
        autoplay={true}
        autoplayDelay={700}
        autoplayInterval={7000}
        loop={true}
      />
    </>
  );
}

type BannerProps = {
  data: Array<{ uri: string }>,
  loading: boolean,
};

export { Banner };
