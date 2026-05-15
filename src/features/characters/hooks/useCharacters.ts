/**
 * @fileoverview useCharacters - infinite scroll hook for the character list.
 * Wraps TanStack Query's useInfiniteQuery with the characters API.
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchCharacters } from '../../../api/characters.api';
import { queryKeys } from '../../../api/queryKeys';
import { Character, CharacterFilters } from '../../../types/api.types';

interface UseCharactersReturn {
  characters: Character[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useCharacters(
  filters: Omit<CharacterFilters, 'page'>,
): UseCharactersReturn {
  const query = useInfiniteQuery({
    queryKey: queryKeys.characters.list(filters),
    queryFn: ({ pageParam }) =>
      fetchCharacters({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      const nextPage = url.searchParams.get('page');
      return nextPage ? parseInt(nextPage, 10) : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const characters = useMemo(
    () => query.data?.pages.flatMap(page => page.results) ?? [],
    [query.data],
  );

  return {
    characters,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}
