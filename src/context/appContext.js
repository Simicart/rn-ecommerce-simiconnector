import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as app_actions from '../store/app_slice.js';

const AppContext = createContext();

const AppContextProviderCore = (props) => {
  const { app_actions, appState, children } = props;

  const appApi = useMemo(
    () => ({
      ...app_actions,
    }),
    [app_actions]
  );

  const contextValue = useMemo(() => [appState, appApi], [appApi, appState]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const mapStateToProps = ({ app }) => ({ appState: app });

const mapDispatchToProps = (dispatch) => ({
  app_actions: bindActionCreators(app_actions, dispatch),
});

const appContextProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContextProviderCore);

export { appContextProvider };
export const useAppContext = () => useContext(AppContext);
