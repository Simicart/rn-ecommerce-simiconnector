import { useEffect } from 'react';
import { useFetchWithProvider } from '../../network';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';

export const useProductList = (payload: { endPoint: string, id?: string }) => {
  const { endPoint = '', id = '' } = payload;

  const { data, loading, error } = useFetchWithProvider({
    endPoint: endPoint,
    resourceId: id,
    cancel: isObjectTruthy(data),
  });

  return {
    data: data ?? {},
    loading: loading,
    error: error,
  };
};
