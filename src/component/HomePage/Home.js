import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { useAppContext } from '../../context';
import { useHomeLite } from '../../hooks/useHomeLite.js';
import { Banner } from './Banner.js';
import { HomeCategoryDisplay } from './HomeCategoryDisplay.js';
import { HorizontalProductList } from './HorizontalProductList.js';
import md5 from 'md5';

const loadingName = 'home';

function Home(props: HomeProps) {
  const [x, setX] = useState(true);

  const [, { addLoadingVector, removeLoadingVector }] = useAppContext();
  const endPoint = props?.endPoint ?? '';

  const { data, error, loading } = useHomeLite({
    endPoint: endPoint,
  });

  useEffect(() => {
    if (loading) {
      addLoadingVector(loadingName);
    } else {
      removeLoadingVector(loadingName);
      // console.log(JSON.stringify(data))
    }
  }, [loading]);

  const raw_banner_data: Array<{
    banner_id: string,
    banner_name: string,
    banner_title: string,
  }> = (data && data?.home?.homebanners?.homebanners) ?? [];

  const raw_category_data: Array<{
    simicategory_filename: string,
    category_id: string,
    cat_name: string,
  }> = (data && data?.home?.homecategories?.homecategories) ?? [];

  const raw_product_list_data: Array<{
    productlist_id: string,
  }> = (data && data?.home?.homeproductlists?.homeproductlists) ?? [];

  const banner_data = raw_banner_data.map((banner) => ({
    id: banner.banner_id ?? '',
    uri: banner.banner_name ?? '',
    title: banner.banner_title ?? '',
  }));

  const category_data = raw_category_data.map((category) => ({
    id: category.category_id ?? '',
    uri: category.simicategory_filename ?? '',
    title: category.cat_name ?? '',
  }));

  const product_list_data = raw_product_list_data.map((product_list) => ({
    id: product_list?.productlist_id ?? '',
  }));

  return (
    <ScrollView>
      <Banner data={banner_data} loading={loading} />
      <HomeCategoryDisplay data={category_data} loading={loading} />
      {product_list_data.map((product_list) => (
        <HorizontalProductList
          key={md5(JSON.stringify(product_list))}
          id={product_list.id}
        />
      ))}
    </ScrollView>
  );
}

type HomeProps = {
  endPoint: string,
};

export { Home };
