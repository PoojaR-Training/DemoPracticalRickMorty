/**
 * @fileoverview Character API request functions.
 */

import { apiClient } from './client';
import { Character, CharacterFilters, PaginatedResponse } from '../types/api.types';

/**
 * Fetches a paginated list of characters with optional filters
 */
export const fetchCharacters = async (
  filters: CharacterFilters,
): Promise<PaginatedResponse<Character>> => {
  const params: Record<string, string | number> = {};
  if (filters.page) params.page = filters.page;
  if (filters.name) params.name = filters.name;
  if (filters.status) params.status = filters.status;
  if (filters.gender) params.gender = filters.gender;
  if (filters.species) params.species = filters.species;

  const { data } = await apiClient.get<PaginatedResponse<Character>>(
    '/character',
    { params },
  );
  return data;
};

/**
 * Fetches a single character by ID.
 */
export const fetchCharacterById = async (id: number): Promise<Character> => {
  const { data } = await apiClient.get<Character>(`/character/${id}`);
  return data;
};

/**
 * Fetches multiple characters by an array of IDs.
 */
export const fetchCharactersByIds = async (
  ids: number[],
): Promise<Character[]> => {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const char = await fetchCharacterById(ids[0]);
    return [char];
  }
  const { data } = await apiClient.get<Character[]>(`/character/${ids.join(',')}`);
  return Array.isArray(data) ? data : [data];
};
