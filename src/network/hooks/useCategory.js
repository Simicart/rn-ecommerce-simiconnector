import { useEffect } from 'react';
import { useFetch } from '..';
import { useCatalogContext } from '../../context';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';
import { categories as categoryEndpoint } from '../endpoints.js';

export const useCategory = () => {
  const [catalogState, catalogApi] = useCatalogContext();
  const { categories, rootCategoryId } = catalogState;
  const { addCategories, setRootCategoryId } = catalogApi;

  const { data, loading, error } = useFetch({
    endPoint: categoryEndpoint,
    cancel: isObjectTruthy(categories[rootCategoryId]),
  });

  useEffect(() => {
    if (isObjectTruthy(data)) {
      addCategories(data);
    }
  }, [data, addCategories]);

  return {
    data: categories ?? {},
    loading: loading,
    error: error,
    addCategories: addCategories,
    setRootCategoryId: setRootCategoryId,
  };
};
