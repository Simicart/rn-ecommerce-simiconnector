import React, { useEffect } from 'react';
import { useFetchWithProvider } from '../../network';
import { useCatalogContext } from '../../context';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';

export const useHomeLite = (payload: { endPoint: string }) => {
  const [{ home }, { setHome }] = useCatalogContext();

  const { data, error, loading } = useFetchWithProvider({
    endPoint: payload.endPoint ?? '',
    cancel: isObjectTruthy(home),
  });

  useEffect(() => {
    if (isObjectTruthy(data)) {
      setHome(data);
    }
  }, [data, setHome]);

  return {
    data: home,
    error: error,
    loading: loading,
    setHome: setHome,
  };
};
