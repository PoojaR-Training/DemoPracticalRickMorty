/**
 * @fileoverview LocationsScreen - infinite scroll list of all locations
 */

import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDebounce } from '../../../hooks/useDebounce';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import { useLocations } from '../hooks/useLocations';
import LocationCard from '../components/LocationCard';
import SearchBar from '../../../components/SearchBar';
import AnimatedHeader from '../../../components/AnimatedHeader';
import EmptyState from '../../../components/EmptyState';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { Location } from '../../../types/api.types';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  HEADER_HEIGHT,
} from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const SKELETON_COUNT = 7;

const LocationsScreen: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  const { scrollHandler, headerTranslateY, scrollEventThrottle } =
    useScrollHeader();

  const { locations, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useLocations({ name: debouncedSearch });

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: Location }) => <LocationCard location={item} />,
    [],
  );


  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader translateY={headerTranslateY}>
        <Text style={styles.headerTitle}>Locations</Text>
      </AnimatedHeader>

      <FlatList
        data={isLoading ? [] : locations}
        keyExtractor={(item: Location) => String(item.id)}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <View style={styles.controls}>
            <SearchBar
              value={searchInput}
              onChangeText={setSearchInput}
              placeholder="Search locations…"
            />
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
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
          ) : (
            <EmptyState
              iconName="map-search"
              title="No locations found"
              subtitle="Try searching by a different name."
            />
          )
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
        contentContainerStyle={styles.listContent}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        showsVerticalScrollIndicator={false}
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
  controls: {
    paddingTop: HEADER_HEIGHT + Spacing.md,
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  listContent: {
    paddingBottom: Spacing.xxxl,
  },
  skeletons: {
    gap: Spacing.sm,
    paddingTop: Spacing.md,
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

export default LocationsScreen;
