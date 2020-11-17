import { useEffect } from 'react';
import { useFetchWithProvider } from '../network';
import { useCatalogContext } from '../context';
import { isObjectTruthy } from '../utils/isObjectTruthy.js';

export const useProduct = (payload: { endPoint: string }) => {
  const [catalogState, catalogApi] = useCatalogContext();
  const { products } = catalogState;
  const { addProducts } = catalogApi;

  const { data, loading, error } = useFetchWithProvider({
    endPoint: payload.endPoint ?? '',
    cancel: isObjectTruthy(products),
  });

  useEffect(() => {
    if (isObjectTruthy(data)) {
      // console.log(data);
      addProducts(data);
    }
  }, [data, addProducts]);

  return {
    data: products ?? {},
    loading: loading,
    error: error,
    setHomeProductData: addProducts,
  };
};
