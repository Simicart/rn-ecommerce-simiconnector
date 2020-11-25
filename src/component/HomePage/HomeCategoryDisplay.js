import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import md5 from 'md5';

function HomeCategoryDisplay(props: HomeCategoryDisplayProps) {
  const { data, loading } = props;

  if (loading) {
    return (
      <View style={{ height: 140 }}>
        <ActivityIndicator
          style={{ flex: 1 }}
          size={'large'}
          color={'#bedbbb'}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        marginTop: 7,
        marginBottom: 7,
        marginLeft: 5,
        marginRight: 5,
      }}
    >
      <Text style={{ fontSize: 20, marginTop: 3, marginBottom: 12 }}>
        Category
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {data.map((category) => {
          return (
            <View key={md5(JSON.stringify(category))} style={{ flex: 1 }}>
              <Image
                source={{ uri: category.uri }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100 / 2,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: 3,
                }}
              >
                {category.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

type HomeCategoryDisplayProps = {
  data: Array<{
    id: string,
    uri: string,
    title: string,
  }>,
  loading: boolean,
};

export { HomeCategoryDisplay };
