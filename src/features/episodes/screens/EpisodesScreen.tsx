/**
 * @fileoverview EpisodesScreen - paginated episode list grouped by season.
 */

import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import { useEpisodes } from '../hooks/useEpisodes';
import EpisodeCard from '../components/EpisodeCard';
import AnimatedHeader from '../../../components/AnimatedHeader';
import ErrorFallback from '../../../components/ErrorFallback';
import EmptyState from '../../../components/EmptyState';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { Episode, SeasonGroup } from '../../../types/api.types';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  HEADER_HEIGHT,
} from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const SKELETON_COUNT = 8;

const EpisodesScreen: React.FC = () => {
  const { scrollHandler, headerTranslateY, scrollEventThrottle } =
    useScrollHeader();

  const {
    seasonGroups,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useEpisodes({});

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorFallback
          message="Couldn't load episodes. Check your connection."
          onRetry={refetch}
        />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <AnimatedHeader translateY={headerTranslateY}>
          <Text style={styles.headerTitle}>Episodes</Text>
        </AnimatedHeader>
        <View style={styles.skeletons}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <View key={i} style={styles.skeletonCard}>
              <SkeletonLoader
                width={44}
                height={44}
                borderRadius={BorderRadius.md}
              />
              <View style={styles.skeletonContent}>
                <SkeletonLoader width="65%" height={16} />
                <SkeletonLoader width={80} height={20} borderRadius={999} />
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  const sections = seasonGroups.map((sg: SeasonGroup) => ({
    title: `Season ${sg.season}`,
    data: sg.episodes,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader translateY={headerTranslateY}>
        <Text style={styles.headerTitle}>Episodes</Text>
      </AnimatedHeader>

      <SectionList
        sections={sections}
        keyExtractor={(item: Episode) => String(item.id)}
        renderItem={({ item }: { item: Episode }) => (
          <EpisodeCard episode={item} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          <EmptyState
            iconName="television-play"
            title="No episodes found"
            subtitle="All episodes will appear here."
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              color={Colors.primary}
              style={styles.footerLoader}
              size="small"
            />
          ) : null
        }
        contentContainerStyle={[styles.listContent]}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: Typography.fontSizeXL,
    fontWeight: Typography.fontWeightBold,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSizeMD,
    fontWeight: Typography.fontWeightBold,
    color: Colors.primary,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  listContent: {
    paddingTop: HEADER_HEIGHT + Spacing.md,
    paddingBottom: Spacing.xxxl,
  },
  skeletons: {
    paddingTop: HEADER_HEIGHT + Spacing.xl,
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  skeletonContent: {
    flex: 1,
    gap: Spacing.sm,
  },
  footerLoader: {
    paddingVertical: Spacing.xl,
  },
});

export default EpisodesScreen;
