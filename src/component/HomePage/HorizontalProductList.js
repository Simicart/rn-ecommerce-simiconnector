import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  Platform,
} from 'react-native';
import { useProductList } from '../../hooks/Home/useProductList.js';
import md5 from 'md5';
import { useFetchWithProvider } from '../../network';
import { home_products_endpoint } from '../../network/utils/endpoint.js';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';

function _HorizontalProductList(props: HorizontalProductListProps) {
  const isParentLoading = props?.loading ?? false;

  const { data, loading, error } = useProductList({
    endPoint: home_products_endpoint,
    id: props.id,
  });

  if (loading) {
    return (
      <View style={{ height: 200 }}>
        <ActivityIndicator
          style={{ flex: 1 }}
          size={'large'}
          color={'#c05555'}
        />
      </View>
    );
  }

  if (error) {
    return <Text>{error.toString()}</Text>;
  }

  const product_data: Array<{
    entity_id: string,
    name: string,
    images: Array<{ url: string }>,
  }> = data?.homeproductlist?.product_array?.products ?? [];

  const title = data?.homeproductlist?.list_title ?? '';

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        <Image
          source={{
            uri: (item?.images?.length > 0 ? item?.images[0]?.url : '') ?? '',
          }}
          style={{
            height: 130,
            width: 130,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            marginTop: 5,
            marginBottom: 5,
            alignSelf: 'center',
            fontSize: 13,
          }}
        >
          {item?.name?.length > 15
            ? item?.name?.slice(0, 15) + '...'
            : item?.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ marginTop: 8, marginBottom: 8 }}>
      <Text
        style={{ marginTop: 5, marginBottom: 5, marginLeft: 7, fontSize: 17 }}
      >
        {title}
      </Text>
      <FlatList
        data={product_data}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(item) => md5(JSON.stringify(item))}
        initialNumToRender={Math.min(product_data.length, 4)}
        maxToRenderPerBatch={4}
        getItemLayout={(data, index) => ({
          length: 150,
          offset: 150 * index,
          index,
        })}
      />
    </View>
  );
}

type HorizontalProductListProps = {
  id: string,
  loading: boolean,
};

export const HorizontalProductList = React.memo(
  _HorizontalProductList,
  (prevProps, nextProps) => {
    return prevProps.id === nextProps.id;
  }
);
