import { configureStore } from '@reduxjs/toolkit';
import infoCardReducer from './slices/infoCardSlice';

export const store = configureStore({
  reducer: {
    infoCard: infoCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
