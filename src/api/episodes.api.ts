/**
 * @fileoverview Episode API request functions.
 */

import { apiClient } from './client';
import { Episode, EpisodeFilters, PaginatedResponse } from '../types/api.types';

/**
 * Fetches a paginated list of episodes with optional filters.
 */
export const fetchEpisodes = async (
  filters: EpisodeFilters,
): Promise<PaginatedResponse<Episode>> => {
  const params: Record<string, string | number> = {};
  if (filters.page) params.page = filters.page;
  if (filters.name) params.name = filters.name;
  if (filters.episode) params.episode = filters.episode;

  const { data } = await apiClient.get<PaginatedResponse<Episode>>(
    '/episode',
    { params },
  );
  return data;
};

/**
 * Fetches a single episode by ID.
 */
export const fetchEpisodeById = async (id: number): Promise<Episode> => {
  const { data } = await apiClient.get<Episode>(`/episode/${id}`);
  return data;
};
