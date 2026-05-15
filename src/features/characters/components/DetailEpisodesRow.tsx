/**
 * @fileoverview DetailEpisodesRow - horizontal scrollable list of all episodes
 */

import React, { memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SkeletonLoader from '../../../components/SkeletonLoader';
import DetailEpisodeChip from './DetailEpisodeChip';
import type { Episode } from '../../../types/api.types';
import { Colors, Spacing, Typography, BorderRadius } from '../../../theme';

interface DetailEpisodesRowProps {
  episodes: Episode[];
  isLoading: boolean;
  totalCount: number;
}

const SKELETON_COUNT = 4;


const DetailEpisodesRow: React.FC<DetailEpisodesRowProps> = memo(
  ({ episodes, isLoading, totalCount }) => {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Episodes</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{totalCount}</Text>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.skeletonRow}>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonLoader
                key={i}
                width={140}
                height={100}
                borderRadius={BorderRadius.lg}
                style={styles.skeletonChip}
              />
            ))}
          </View>
        ) : (
          <FlatList
            data={episodes}
            horizontal
            keyExtractor={item => String(item.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <DetailEpisodeChip episode={item} index={index} />
            )}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
    color: Colors.textPrimary,
  },
  countBadge: {
    backgroundColor: Colors.primaryMuted,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  countText: {
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightBold,
    color: Colors.primary,
  },
  skeletonRow: {
    flexDirection: 'row',
    paddingLeft: Spacing.lg,
    gap: Spacing.md,
  },
  skeletonChip: {
    marginRight: 0,
  },
  listContent: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.sm,
  },
});

export default DetailEpisodesRow;
