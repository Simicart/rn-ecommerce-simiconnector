import React, { createContext, useContext, useMemo } from 'react';

const URLContext = createContext();

const BaseUrlProvider = (props) => {
  const { defaultBaseURL = null, defaultToken = null, children } = props ?? {};

  const contextValue = useMemo(
    () => ({
      baseURL: defaultBaseURL,
      defaultToken: defaultToken,
    }),
    [defaultBaseURL, defaultToken]
  );

  return (
    <URLContext.Provider value={contextValue}>{children}</URLContext.Provider>
  );
};

const useBaseURLFromContext = () => useContext(URLContext);

export { BaseUrlProvider, useBaseURLFromContext };
