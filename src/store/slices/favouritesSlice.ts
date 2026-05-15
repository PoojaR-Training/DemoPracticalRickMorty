/**
 * @fileoverview Favourites Redux slice. Persisted via redux-persist + SQLite.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/api.types';
import { FavouritesState } from '../../types/store.types';

const initialState: FavouritesState = {
  ids: [],
  characters: {},
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<Character>) {
      const char = action.payload;
      if (!state.ids.includes(char.id)) {
        state.ids.push(char.id);
        state.characters[char.id] = char;
      }
    },
    removeFavourite(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.ids = state.ids.filter(existingId => existingId !== id);
      delete state.characters[id];
    },
    clearFavourites(state) {
      state.ids = [];
      state.characters = {};
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
