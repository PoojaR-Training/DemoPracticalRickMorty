/**
 * @fileoverview useLocations - infinite scroll hook for the locations list.
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchLocations } from '../../../api/locations.api';
import { queryKeys } from '../../../api/queryKeys';
import { Location, LocationFilters } from '../../../types/api.types';

interface UseLocationsReturn {
  locations: Location[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useLocations(
  filters: Omit<LocationFilters, 'page'>,
): UseLocationsReturn {
  const query = useInfiniteQuery({
    queryKey: queryKeys.locations.list(filters),
    queryFn: ({ pageParam }) =>
      fetchLocations({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      const next = url.searchParams.get('page');
      return next ? parseInt(next, 10) : undefined;
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  const locations = useMemo(
    () => query.data?.pages.flatMap(p => p.results) ?? [],
    [query.data],
  );

  return {
    locations,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}
