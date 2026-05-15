/**
 * @fileoverview UI Redux slice.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../../types/store.types';

const initialState: UIState = {
  characterFilters: {
    status: '',
    gender: '',
    search: '',
  },
  episodeFilters: {
    search: '',
  },
  locationFilters: {
    search: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCharacterStatus(state, action: PayloadAction<string>) {
      state.characterFilters.status = action.payload;
    },
    setCharacterGender(state, action: PayloadAction<string>) {
      state.characterFilters.gender = action.payload;
    },
    setCharacterSearch(state, action: PayloadAction<string>) {
      state.characterFilters.search = action.payload;
    },
    setEpisodeSearch(state, action: PayloadAction<string>) {
      state.episodeFilters.search = action.payload;
    },
    setLocationSearch(state, action: PayloadAction<string>) {
      state.locationFilters.search = action.payload;
    },
    resetCharacterFilters(state) {
      state.characterFilters = initialState.characterFilters;
    },
  },
});

export const {
  setCharacterStatus,
  setCharacterGender,
  setCharacterSearch,
  setEpisodeSearch,
  setLocationSearch,
  resetCharacterFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
