// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './slices/storiesSlice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;