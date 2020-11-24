import React, { useRef, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function Banner(props: BannerProps) {
  const { data } = props;
  const carouselRef = useRef(null);

  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={{ flex: 1 }}>
        <ParallaxImage
          source={{ uri: item.uri }}
          containerStyle={{
            width: screenWidth - 16,
            height: Math.floor(screenHeight / 3),
          }}
          style={{}}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={{}} numberOfLines={2}>
          {item?.title ?? 'no title'}
        </Text>
      </View>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={data}
      renderItem={_renderItem}
      containerCustomStyle={{ flex: 1 }}
      slideStyle={{
        flex: 1,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 6,
        marginBottom: 6,
      }}
      hasParallaxImages={true}
    />
  );
}

type BannerProps = {
  data: Array<{ uri: string }>,
};

export { Banner };
