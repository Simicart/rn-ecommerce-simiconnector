import React, { useEffect } from 'react';
import { useFetch } from '..';
import { config_provider } from '../endpoints.js';
import { useAppContext } from '../../context';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';
import { config_provider_secret } from '../secret.js';

export const useAppConfig = () => {
  const [appState, appApi] = useAppContext();
  const { app_config } = appState;
  const { setAppConfig } = appApi;

  const { data, error, loading } = useFetch({
    endPoint: config_provider,
    cancel: isObjectTruthy(app_config),
    token: config_provider_secret,
  });

  useEffect(() => {
    if (isObjectTruthy(data)) {
      setAppConfig(data);
    }
  }, [data, setAppConfig]);

  return {
    data: app_config,
    error: error,
    loading: loading,
    setAppConfig: setAppConfig,
  };
};
