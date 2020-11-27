import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Button, ScrollView, Text, View } from 'react-native';
import {
  Home as HomePage,
  useFetch,
  useFetchWithProvider,
  useLazyFetchWithProvider,
  useAppContext,
  useCustomerContext,
  useLazyFetch,
  GeneralizedForm,
  fieldType,
} from 'rn-ecommerce-simiconnector';
import type {} from 'rn-ecommerce-simiconnector';

function TestGlobalLoading(props) {
  const data = [
    {
      inputKey: 'abc',
      inputType: fieldType.EMAIL,
      inputTitle: 'SHow it',
    },
    {
      inputKey: 'abc1',
      inputType: fieldType.EMAIL,
      inputTitle: 'SHow it',
    },
    {
      inputKey: 'abc2',
      inputType: fieldType.TEXT,
      inputTitle: 'SHow it',
    },
  ];

  const validationSchema = {
    abc: yup.string().test('oh no', 'oh no', (value) => {
      return (value ?? '').length > 3;
    }),
  };
  // validationSchema.isValid({abc: 'asdasdsadsa'}).then(x=> console.log(x))

  // const abc = FormValidationClass.getValidationSchema(data, validationSchema);
  // console.log(abc.describe())

  // abc.isValid({'abc': 'saddS@dfs.com', abc1: 'sd', abc2: ''}).then(x => console.log(x));

  return (
    <ScrollView>
      <View style={{ height: 50 }} />
      <Text>Something</Text>
      <GeneralizedForm formShape={data} validationObject={validationSchema} />
    </ScrollView>
  );
}

export { TestGlobalLoading };
