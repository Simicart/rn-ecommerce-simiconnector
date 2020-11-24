import React, { useEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAppContext,
  useFetch,
  useProduct,
  useAppConfig,
  useLazyFetch,
  useFetchWithProvider,
  useLazyFetchWithProvider,
} from 'rn-ecommerce-simiconnector';
import type { looseFieldData } from '../../../../src/component/form/data.flow.js';
import { fieldType } from '../../../../src/component/form/fieldType.js';
import { GeneralizedForm } from '../../../../src/component/form/GeneralizedForm.js';
import * as yup from 'yup';
import { useCategory } from '../../../../src/hooks/useCategory.js';

import { useCategoryProduct } from '../../../../src/hooks/useCategoryProduct.js';
import {
  config_provider_endpoint,
  products_endpoint,
  baseURL,
  categories_endpoint,
} from './endpoints.js';
import { config_provider_secret } from './secret.js';

function TestGlobalLoading(props) {
  const [appState, appApi] = useAppContext();
  const { setGlobalLoading, unsetGlobalLoading } = appApi;
  const { baseURL } = appState;

  const [id, setId] = useState(1);

  // const {data, loading, error} = useFetch({
  //   baseURL: baseURL,
  //   endPoint: products_endpoint,
  //   token: '123'
  // });

  // const {data, loading, error} = useFetch({
  //   endPoint: 'https://jsonplaceholder.typicode.com/posts',
  //   initialGetParams: {
  //     id: id
  //   }
  // });

  // const {data, loading, error} = useFetchWithProvider({
  //   endPoint: products_endpoint,
  // });

  // const {} = useCategory({endPoint: categories_endpoint});
  // const {} = useProduct({endPoint: products_endpoint});
  // //
  // const loading = false;
  // const {products} = useCategoryProduct('3');
  // const data = products;
  //
  // fetch('https://jsonplaceholder.typicode.com/posts?userId=1').
  //     then(response => response.json()).
  //     then(json => console.log(json));
  //

  // const [_request, { data, loading, error }] = useLazyFetchWithProvider({
  //   endPoint: 'https://jsonplaceholder.typicode.com/posts',
  //   initialGetParams: {
  //     id: id,
  //   },
  // });

  // const [_request, { data, loading, error }] = useLazyFetchWithProvider({
  //   endPoint: products_endpoint,
  // });

  // const request = async () => {
  //   return await _request();
  // };
  //
  // useEffect(() => {
  //   console.log('id ' + id);
  //   request().then((x) => console.log(x));
  // }, [id]);
  // const {data, error, loading} = useHomePage();

  //
  // const {data, loading, error} = useProduct({
  //   endPoint: products_endpoint,
  // });
  //

  // const { data, loading, error } = useAppConfig({
  //   endPoint: config_provider_endpoint,
  //   token: config_provider_secret,
  // });

  const formShape: Array<looseFieldData> = [
    {
      inputKey: '123',
      inputType: fieldType.TEXT,
      inputTitle: 'welcome',
      initialValue: 'hello there',
    },
    {
      inputKey: '1234',
      inputType: 'text',
      inputTitle: 'welcome',
      initialValue: 'hello there abalaca',
    },
    {
      inputKey: '1233',
      inputType: 'text3',
      inputTitle: 'welcome',
      initialValue: 'hello there',
    },
    {
      inputKey: 'hello',
      CustomElement: Button,
      params: {
        title: 'A title',
        onPress: () => console.log(1),
      },
      optOut: true,
    },
  ];

  const validationObject = yup.object().shape({
    hello: yup.string().test((value) => value.length > 20),
  });

  const onSubmit = (x) => console.log(x);
  const MagicButton = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={{ backgroundColor: '#66F' }}
      >
        <Text>Eat me</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      <Text>Something rendered</Text>
      <GeneralizedForm
        formShape={formShape}
        // onSubmit={onSubmit}
        // SubmitButton={MagicButton}
      />
      <Text>Something rendered</Text>

      {/*<Button title={'start'} onPress={setGlobalLoading}/>*/}
      {/*<Button title={'remove'} onPress={unsetGlobalLoading}/>*/}
      {/*<Button title={'request'} onPress={request} />*/}

      {/*<Button*/}
      {/*    title={id.toString()}*/}
      {/*    onPress={() => {*/}
      {/*      setId((prevState) => prevState + 1);*/}
      {/*    }}*/}
      {/*/>*/}

      {/*<Text>{data && !loading && JSON.stringify(data, null, 2)}</Text>*/}
    </ScrollView>
  );
}

export { TestGlobalLoading };
