/**
 * @fileoverview CharacterCardSkeleton - animated placeholder while characters load.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { Colors, Spacing, BorderRadius } from '../../../theme';


const CharacterCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <SkeletonLoader width={88} height={88} borderRadius={BorderRadius.md} />
      <View style={styles.content}>
        <SkeletonLoader width="80%" height={18} />
        <SkeletonLoader width={70} height={22} borderRadius={999} />
        <SkeletonLoader width="60%" height={14} />
        <SkeletonLoader width="75%" height={14} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  content: {
    flex: 1,
    gap: Spacing.sm,
    justifyContent: 'center',
  },
});

export default CharacterCardSkeleton;
