/**
 * @fileoverview useCharacterEpisodes - resolves full Episode objects from the
 * character's `episode` URL array.
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/client';
import type { Episode } from '../../../types/api.types';

interface UseCharacterEpisodesReturn {
  episodes: Episode[];
  isLoading: boolean;
  isError: boolean;
}

function parseIdFromUrl(url: string): number {
  return parseInt(url.split('/').pop() ?? '0', 10);
}

export function useCharacterEpisodes(
  episodeUrls: string[],
): UseCharacterEpisodesReturn {
  const ids = episodeUrls.map(parseIdFromUrl).filter(id => id > 0);

  const query = useQuery({
    queryKey: ['characterEpisodes', ids],
    queryFn: async (): Promise<Episode[]> => {
      if (ids.length === 0) return [];
      const endpoint =
        ids.length === 1 ? `/episode/${ids[0]}` : `/episode/${ids.join(',')}`;
      const { data } = await apiClient.get<Episode | Episode[]>(endpoint);
      return Array.isArray(data) ? data : [data];
    },
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  return {
    episodes: query.data ?? [],
    isLoading: query.isLoading && ids.length > 0,
    isError: query.isError,
  };
}
