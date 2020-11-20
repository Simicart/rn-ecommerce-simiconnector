import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { useAppContext } from '../../context';

const RedundantGlobalLoading = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [appState, appApi] = useAppContext();
  const { loadingVectors } = appState;
  const { unsetGlobalLoading } = appApi;

  useEffect(() => {
    if (loadingVectors.filter((x) => x === 'global').length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [loadingVectors]);

  const removeModal = () => {
    unsetGlobalLoading();
  };

  return (
    <Modal isVisible={isVisible} onBackButtonPress={removeModal}>
      {/*might remove onBackButtonPress this later*/}
      <View style={{ display: 'flex' }}>
        <ActivityIndicator
          style={{ flex: 1 }}
          size={'large'}
          color={'#fbbedf'}
        />
      </View>
    </Modal>
  );
};

export { RedundantGlobalLoading };
