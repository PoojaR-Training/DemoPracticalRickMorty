/**
 * @fileoverview useEpisodes - fetches all episodes with infinite pagination.
 * Groups results by season for display.
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchEpisodes } from '../../../api/episodes.api';
import { queryKeys } from '../../../api/queryKeys';
import { Episode, EpisodeFilters, SeasonGroup } from '../../../types/api.types';

interface UseEpisodesReturn {
  episodes: Episode[];
  seasonGroups: SeasonGroup[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

function parseSeason(episodeCode: string): number {
  const match = episodeCode.match(/^S(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

function groupBySeason(episodes: Episode[]): SeasonGroup[] {
  const map = new Map<number, Episode[]>();
  for (const ep of episodes) {
    const season = parseSeason(ep.episode);
    if (!map.has(season)) map.set(season, []);
    map.get(season)!.push(ep);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([season, eps]) => ({ season, episodes: eps }));
}

export function useEpisodes(filters: Omit<EpisodeFilters, 'page'>): UseEpisodesReturn {
  const query = useInfiniteQuery({
    queryKey: queryKeys.episodes.list(filters),
    queryFn: ({ pageParam }) =>
      fetchEpisodes({ ...filters, page: pageParam as number }),
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

  const episodes = useMemo(
    () => query.data?.pages.flatMap(p => p.results) ?? [],
    [query.data],
  );

  const seasonGroups = useMemo(() => groupBySeason(episodes), [episodes]);

  return {
    episodes,
    seasonGroups,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}
