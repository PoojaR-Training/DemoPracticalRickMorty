import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { Colors, Spacing, BorderRadius } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_WIDTH * 0.75;

const DetailSkeletonScreen: React.FC = () => (
  <ScrollView
    style={styles.container}
    scrollEnabled={false}
    contentContainerStyle={styles.content}>
    <SkeletonLoader width={SCREEN_WIDTH} height={HERO_HEIGHT} borderRadius={0} />

    <View style={styles.body}>
      <SkeletonLoader width="70%" height={28} borderRadius={BorderRadius.md} />
      <SkeletonLoader width={80} height={26} borderRadius={BorderRadius.full} style={styles.badgeSkeleton} />

      <View style={styles.divider} />
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={styles.infoRow}>
          <SkeletonLoader width={32} height={32} borderRadius={BorderRadius.sm} />
          <View style={styles.infoText}>
            <SkeletonLoader width={60} height={10} />
            <SkeletonLoader width="55%" height={16} />
          </View>
        </View>
      ))}

      <View style={styles.divider} />

      <SkeletonLoader width={120} height={20} borderRadius={BorderRadius.md} />
      <View style={styles.episodeSkeletons}>
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonLoader
            key={i}
            width={140}
            height={100}
            borderRadius={BorderRadius.lg}
          />
        ))}
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 40 },
  body: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.sm,
  },
  badgeSkeleton: { marginTop: Spacing.xs },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  infoText: { flex: 1, gap: Spacing.xs },
  episodeSkeletons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
});

export default DetailSkeletonScreen;
