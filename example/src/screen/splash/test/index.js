import React from 'react';
import { Button, Text, View } from 'react-native';
import {
  useAppContext,
  useBaseURLFromContext,
  useFetch,
} from 'rn-ecommerce-simiconnector';
import { useAppConfig } from '../../../../../src/hooks';

function TestGlobalLoading(props) {
  const [, appApi] = useAppContext();
  const { setGlobalLoading, unsetGlobalLoading } = appApi;
  const { baseURL } = useBaseURLFromContext();

  // const {data, error, loading} = useFetch({
  //   endPoint:'https://www.simicart.com/appdashboard/rest/app_configs/',
  //   token: 'tK2Pivoq8EM8bll6l6YunV0VSqBXNyrgit6AZu1'
  // })

  const { data, loading, error } = useAppConfig();

  return (
    <View>
      <Text>Something rendered</Text>
      <Text>{baseURL === null ? 'is null' : 'oops'}</Text>
      <Text>{data && !loading && JSON.stringify(data)}</Text>

      <Button title={'start'} onPress={setGlobalLoading} />
      <Button title={'remove'} onPress={unsetGlobalLoading} />
    </View>
  );
}

export { TestGlobalLoading };
