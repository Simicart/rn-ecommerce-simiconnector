import { useCallback, useMemo, useState } from 'react';
import { useCatalogContext } from '../context';
import { useFetchWithProvider } from '../network';
import { isDeeplyEqual } from '../utils/isObjectDeeplyEqual.js';

export const useCategoryProduct = (categoryId: string) => {
  const [{ categories, products }] = useCatalogContext();
  const [_category_data, _set_category_data] = useState({});

  const category_data = categories[categoryId] ?? {};
  if (!isDeeplyEqual(_category_data, category_data)) {
    _set_category_data(category_data);
  }

  const product_ids = category_data?.all_ids ?? [];

  console.log(JSON.stringify(product_ids).slice(0, 200));

  const product_data = useCallback(
    (products: {}, product_ids: Array<string>) =>
      Object.entries(products)
        .filter(([key]) => product_ids.indexOf(key) !== -1)
        .map((pair) => pair[1]),
    []
  );

  console.log(
    JSON.stringify(product_data(products, product_ids)).slice(0, 200)
  );

  return useMemo(() => {
    return {
      ..._category_data,
      products: product_data(products, product_ids),
    };
  }, [product_data, products, product_ids, _category_data]);
};
