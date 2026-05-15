/**
 * @fileoverview Redux store type definitions.
 */

import { Character } from './api.types';

export interface FavouritesState {
  ids: number[];
  characters: Record<number, Character>;
}

export interface UIState {
  characterFilters: {
    status: string;
    gender: string;
    search: string;
  };
  episodeFilters: {
    search: string;
  };
  locationFilters: {
    search: string;
  };
}

export interface RootState {
  favourites: FavouritesState;
  ui: UIState;
}
