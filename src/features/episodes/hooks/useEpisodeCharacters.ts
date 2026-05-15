/**
 * @fileoverview useEpisodeCharacters - fetches character data for a specific episode.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchCharactersByIds } from '../../../api/characters.api';
import { queryKeys } from '../../../api/queryKeys';
import { Character, Episode } from '../../../types/api.types';

interface UseEpisodeCharactersReturn {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
}

function parseId(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 1], 10);
}

export function useEpisodeCharacters(
  episode: Episode | undefined,
): UseEpisodeCharactersReturn {
  const ids = episode ? episode.characters.map(parseId) : [];

  const query = useQuery({
    queryKey: queryKeys.characters.byIds(ids),
    queryFn: () => fetchCharactersByIds(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  return {
    characters: (query.data ?? []) as Character[],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
