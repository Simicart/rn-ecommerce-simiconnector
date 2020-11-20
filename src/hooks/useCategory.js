import { useEffect } from 'react';
import { useFetchWithProvider } from '../network';
import { useCatalogContext } from '../context';
import { isObjectTruthy } from '../utils/isObjectTruthy.js';

export const useCategory = (payload: { endPoint: string }) => {
  const [catalogState, catalogApi] = useCatalogContext();
  const { categories } = catalogState;
  const { addCategories } = catalogApi;

  const { data, loading, error } = useFetchWithProvider({
    endPoint: payload.endPoint ?? '',
    cancel: isObjectTruthy(categories),
  });

  useEffect(() => {
    if (isObjectTruthy(data)) {
      // console.log(data);
      addCategories(data);
    }
  }, [data, addCategories]);

  return {
    data: categories ?? {},
    loading: loading,
    error: error,
    setHomeProductData: addCategories,
  };
};
