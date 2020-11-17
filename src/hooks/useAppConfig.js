import React, { useEffect } from 'react';
import { useFetchWithProvider } from '../network';
import { useAppContext } from '../context';
import { isObjectTruthy } from '../utils/isObjectTruthy.js';

export const useAppConfig = (payload: { endPoint: string, token: string }) => {
  const [appState, appApi] = useAppContext();
  const { app_config } = appState;
  const { setAppConfig } = appApi;

  const { data, error, loading } = useFetchWithProvider({
    endPoint: payload.endPoint ?? '',
    cancel: isObjectTruthy(app_config),
    token: payload.token ?? '',
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
