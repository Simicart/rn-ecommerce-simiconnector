import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  app_config: {},
  merchant_config: {},
  isLoading: false,
  loadingType: 'none',
  hasUpdate: false,
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

    setUpdateNotification(state, action: PayloadAction<boolean>) {
      state.hasUpdate = action.payload;
    },
  },
});

export const {
  setAppConfig,
  setMerchantConfig,
  setLoading,
  setLoadingType,
  setUpdateNotification,
} = appSlice.actions;

export default appSlice.reducer;
export const appReducer = appSlice.reducer;
