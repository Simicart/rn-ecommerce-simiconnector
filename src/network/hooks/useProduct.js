import { useEffect } from 'react';
import { useFetch } from '..';
import { useCatalogContext } from '../../context';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';
import { homeProducts as homeProductEndpoint } from '../endpoints.js';

export const useProduct = () => {
  const [catalogState, catalogApi] = useCatalogContext();
  const { home_products } = catalogState;
  const { setHomeProductData } = catalogApi;

  const { data, loading, error } = useFetch({
    endPoint: homeProductEndpoint,
    cancel: isObjectTruthy(home_products),
  });

  useEffect(() => {
    if (isObjectTruthy(data)) {
      setHomeProductData(data);
    }
  }, [data, setHomeProductData]);

  return {
    data: home_products ?? {},
    loading: loading,
    error: error,
    setHomeProductData: setHomeProductData,
  };
};
