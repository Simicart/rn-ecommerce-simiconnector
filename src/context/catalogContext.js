import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as catalog_actions from '../store/catalog_slice.js';

const CatalogContext = createContext();

const CatalogContextProviderCore = (props) => {
  const { catalog_actions, catalogState, children } = props;

  const catalogApi = useMemo(
    () => ({
      ...catalog_actions,
    }),
    [catalog_actions]
  );

  const contextValue = useMemo(() => [catalogState, catalogApi], [
    catalogApi,
    catalogState,
  ]);

  return (
    <CatalogContext.Provider value={contextValue}>
      {children}
    </CatalogContext.Provider>
  );
};

const mapStateToProps = ({ catalog }) => ({ catalogState: catalog });

const mapDispatchToProps = (dispatch) => ({
  catalog_actions: bindActionCreators(catalog_actions, dispatch),
});

const catalogContextProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogContextProviderCore);

export { catalogContextProvider };
export const useCatalogContext = () => useContext(CatalogContext);
