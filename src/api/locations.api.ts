/**
 * @fileoverview Location API request functions.
 */

import { apiClient } from './client';
import { Location, LocationFilters, PaginatedResponse } from '../types/api.types';

/**
 * Fetches a paginated list of locations with optional filters.
 */
export const fetchLocations = async (
  filters: LocationFilters,
): Promise<PaginatedResponse<Location>> => {
  const params: Record<string, string | number> = {};
  if (filters.page) params.page = filters.page;
  if (filters.name) params.name = filters.name;
  if (filters.type) params.type = filters.type;
  if (filters.dimension) params.dimension = filters.dimension;

  const { data } = await apiClient.get<PaginatedResponse<Location>>(
    '/location',
    { params },
  );
  return data;
};

/**
 * Fetches a single location by ID.
 */
export const fetchLocationById = async (id: number): Promise<Location> => {
  const { data } = await apiClient.get<Location>(`/location/${id}`);
  return data;
};
