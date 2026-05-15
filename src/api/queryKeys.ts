/**
 * @fileoverview Centralised TanStack Query key factories.
 * Using key factories ensures consistent cache invalidation and avoids spelling mistake.
 */

import { CharacterFilters, EpisodeFilters, LocationFilters } from '../types/api.types';

export const queryKeys = {
  characters: {
    all: ['characters'] as const,
    lists: () => [...queryKeys.characters.all, 'list'] as const,
    list: (filters: CharacterFilters) =>
      [...queryKeys.characters.lists(), filters] as const,
    detail: (id: number) => [...queryKeys.characters.all, 'detail', id] as const,
    byIds: (ids: number[]) =>
      [...queryKeys.characters.all, 'byIds', ids] as const,
  },
  episodes: {
    all: ['episodes'] as const,
    lists: () => [...queryKeys.episodes.all, 'list'] as const,
    list: (filters: EpisodeFilters) =>
      [...queryKeys.episodes.lists(), filters] as const,
    detail: (id: number) => [...queryKeys.episodes.all, 'detail', id] as const,
  },
  locations: {
    all: ['locations'] as const,
    lists: () => [...queryKeys.locations.all, 'list'] as const,
    list: (filters: LocationFilters) =>
      [...queryKeys.locations.lists(), filters] as const,
    detail: (id: number) => [...queryKeys.locations.all, 'detail', id] as const,
  },
} as const;
