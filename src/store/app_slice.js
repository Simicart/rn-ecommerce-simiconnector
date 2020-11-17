import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  app_config: {},
  merchant_config: {},
  isLoading: false,
  loadingType: 'none',
  loadingVectors: [],
  hasUpdate: false,
  stack: 'splash',
  baseURL: null,
  baseToken: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppConfig(state, action: PayloadAction<{}>) {
      state.app_config = action.payload;
    },

    setMerchantConfig(state, action: PayloadAction<{}>) {
      state.merchant_config = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setLoadingType(state, action: PayloadAction<string>) {
      state.loadingType = action.payload;
    },

    addLoadingVector(state, action: PayloadAction<string>) {
      state.loadingVectors.push(action.payload);
      state.isLoading = true;
    },

    removeLoadingVector(state, action: PayloadAction<string>) {
      state.loadingVectors = state.loadingVectors.filter(
        (vector) => vector !== action.payload
      );
      if (state.loadingVectors.length === 0) {
        state.isLoading = false;
      }
    },

    setUpdateNotification(state, action: PayloadAction<boolean>) {
      state.hasUpdate = action.payload;
    },

    setRouteName(state, action: PayloadAction<boolean>) {
      state.stack = action.payload;
    },

    setBaseURL(state, action: PayloadAction<string>) {
      state.baseURL = action.payload;
    },
    setBaseToken(state, action: PayloadAction<string>) {
      state.baseToken = action.payload;
    },
  },
});

export const {
  setAppConfig,
  setMerchantConfig,
  setLoading,
  setLoadingType,
  setUpdateNotification,
  addLoadingVector,
  removeLoadingVector,
  setRouteName,
  setBaseURL,
  setBaseToken,
} = appSlice.actions;

export const setGlobalLoading = () => (dispatch) => {
  dispatch(addLoadingVector('global'));
};

export const unsetGlobalLoading = () => (dispatch) => {
  dispatch(removeLoadingVector('global'));
};

export const appReducer = appSlice.reducer;

export default {
  ...appSlice.actions,
  setGlobalLoading,
  unsetGlobalLoading,
};
