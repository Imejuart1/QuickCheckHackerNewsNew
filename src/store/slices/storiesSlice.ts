// src/store/slices/storiesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopStories } from '../../services/hn-api';

export const loadStories = createAsyncThunk(
  'stories/load',
  async (page: number) => {
    const stories = await fetchTopStories(page);
    return stories;
  }
);

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    items: [] as any[],
    loading: false,
    error: null as string | null,
    page: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadStories.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.loading = false;
        state.page += 1;
      })
      .addCase(loadStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load stories';
      });
  },
});

export default storiesSlice.reducer;