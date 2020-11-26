import md5 from 'md5';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useAppContext } from '../../context';
import { useHomeLite } from '../../hooks/Home/useHomeLite.js';
import { home_endpoint } from '../../network/utils/endpoint.js';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';
import { Banner } from './Banner.js';
import { HomeCategoryDisplay } from './HomeCategoryDisplay.js';
import { HorizontalProductList } from './HorizontalProductList.js';

const loadingName = 'home';

function Home(props: HomeProps) {
  const [, { addLoadingVector, removeLoadingVector }] = useAppContext();
  const { data, loading } = useHomeLite({
    endPoint: home_endpoint,
  });

  useEffect(() => {
    if (loading) {
      addLoadingVector(loadingName);
    } else {
      removeLoadingVector(loadingName);
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
      <View style={{ height: 10 }} />
      <HomeCategoryDisplay data={category_data} loading={loading} />
      <View style={{ height: 10 }} />
      {product_list_data.map((product_list) => (
        <HorizontalProductList
          key={md5(JSON.stringify(product_list))}
          id={product_list.id}
          loading={loading}
        />
      ))}
    </ScrollView>
  );
}

type HomeProps = {};

export { Home };
