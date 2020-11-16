import set from '@babel/runtime/helpers/esm/set.js';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import RnEcommerceSimiconnector, {
  useFetch,
  useAppContext,
  useCheckoutContext,
  useCatalogContext,
  useCustomerContext,
  useAppConfig,
  useLoading,
  useCategory,
  useProduct,
  useLazyFetch,
} from 'rn-ecommerce-simiconnector';
import { categories as categoryEndpoint } from '../../src/network/endpoints.js';
import { isObjectTruthy } from '../../src/utils/isObjectTruthy.js';

export default function App() {
  const [id, setId] = useState(3);
  const [param, setParam] = useState({});
  //
  // const change = () => {
  //   setParam({x: 1});
  // };
  //
  // useEffect(() => {
  //   setTimeout(change, 10000);
  // }, []);

  const [catalogState] = useCatalogContext();

  const { data, error, loading, cancel } = useFetch({
    endPoint: categoryEndpoint,
    resourceId: id,
    initialGetParams: param,
  });

  // const {data, error, loading} = useCategory()

  // const [request, {data, error, loading}] = useLazyFetch({
  //   endPoint: categoryEndpoint
  // });

  // const requestWrapper = () => {
  //     request();
  // };

  if (loading) {
    return (
      <View>
        <Text>loading</Text>
        <Button title={'cancel'} onPress={cancel} />
      </View>
    );
  } else if (error) {
    return (
      <View>
        <Text>{error.toString()}</Text>
        <Button title={'cancel'} onPress={cancel} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <RnEcommerceSimiconnector />
          <Text>{data ? JSON.stringify(data, null, 2) : 'xcb'}</Text>
          {/*<Text>{ JSON.stringify(catalogState.categories, null, 2)}</Text>*/}
          <Text>{error && JSON.stringify(error, null, 2).slice(0, 100)}</Text>
          <Text>x</Text>
          {/*<Text>{JSON.stringify(Object.keys(api), null, 2)}</Text>*/}
          {/*<Button title={'hello'} onPress={requestWrapper}/>*/}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
