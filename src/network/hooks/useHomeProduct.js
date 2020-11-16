import { useEffect } from 'react';
import { useFetch } from '..';
import { useCatalogContext } from '../../context';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';
import { products as productEndpoint } from '../endpoints.js';

export const useHomeProduct = () => {
  const [catalogState, catalogApi] = useCatalogContext();
  const { products } = catalogState;
  const { addProducts } = catalogApi;

  const { data, loading, error } = useFetch({
    endPoint: productEndpoint,
    cancel: isObjectTruthy(products),
  });

  useEffect(() => {
    if (isObjectTruthy(data)) {
      addProducts(data);
    }
  }, [data, addProducts]);

  return {
    data: products ?? {},
    loading: loading,
    error: error,
    addProducts: addProducts,
  };
};
