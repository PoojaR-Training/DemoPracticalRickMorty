/**
 * @fileoverview useCharacterDetail - fetches a single character by ID from
 * GET /character/{id}. Results are cached and re-used across screens.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../../../api/characters.api';
import { queryKeys } from '../../../api/queryKeys';
import type { Character } from '../../../types/api.types';

interface UseCharacterDetailReturn {
  character: Character | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useCharacterDetail(id: number): UseCharacterDetailReturn {
  const query = useQuery({
    queryKey: queryKeys.characters.detail(id),
    queryFn: () => fetchCharacterById(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: id > 0,
    retry: 2,
  });

  return {
    character: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}
