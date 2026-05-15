/**
 * @fileoverview useLocationResidents - fetches characters residing at a location.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchCharactersByIds } from '../../../api/characters.api';
import { queryKeys } from '../../../api/queryKeys';
import { Character, Location } from '../../../types/api.types';

interface UseLocationResidentsReturn {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
}

function parseId(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 1], 10);
}

export function useLocationResidents(
  location: Location | undefined,
): UseLocationResidentsReturn {
  const ids = location ? location.residents.map(parseId) : [];

  const query = useQuery({
    queryKey: queryKeys.characters.byIds(ids),
    queryFn: () => fetchCharactersByIds(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  return {
    characters: (query.data ?? []) as Character[],
    isLoading: query.isLoading && ids.length > 0,
    isError: query.isError,
  };
}
