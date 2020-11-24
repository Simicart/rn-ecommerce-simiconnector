import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useAppContext } from '../../context';
import { useHomeLite } from '../../hooks/useHomeLite.js';
import { Banner } from './Banner.js';

const loadingName = 'home';

function Home(props: HomeProps) {
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
    }
  }, [loading]);

  const raw_banner_data: Array<{
    banner_id: string,
    banner_name: string,
    banner_title: string,
  }> = (data && data?.home?.homebanners?.homebanners) ?? [];
  const banner_data = raw_banner_data.map((banner) => ({
    id: banner.banner_id,
    uri: banner.banner_name,
    title: banner.banner_title,
  }));

  return (
    <ScrollView>
      <Text>Something rendered</Text>
      {/*<Banner data={banner_data}/>*/}
    </ScrollView>
  );
}

type HomeProps = {
  endPoint: string,
};

export { Home };
