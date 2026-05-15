/**
 * @fileoverview FavouritesScreen - offline screen showing saved characters.
 */

import React, { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  removeFavourite,
  clearFavourites,
} from '../../../store/slices/favouritesSlice';
import FavouriteCard from '../components/FavouriteCard';
import EmptyState from '../../../components/EmptyState';
import { Character } from '../../../types/api.types';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  HEADER_HEIGHT,
} from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavouritesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ids, characters } = useAppSelector(state => state.favourites);
  const favouriteCharacters = ids.map(id => characters[id]).filter(Boolean) as Character[];

  const handleRemove = useCallback(
    (id: number) => dispatch(removeFavourite(id)),
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <FavouriteCard character={item} onRemove={handleRemove} />
    ),
    [handleRemove],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
        {favouriteCharacters.length > 0 && (
          <TouchableOpacity
            onPress={() => dispatch(clearFavourites())}
            style={styles.clearButton}
            activeOpacity={0.8}>
            <Icon name="trash-can-outline" size={16} color={Colors.dead} />
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.offlineBadge}>
        <Icon name="wifi-off" size={12} color={Colors.textMuted} />
        <Text style={styles.offlineText}>Available offline</Text>
      </View>

      <FlatList
        data={favouriteCharacters}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyState
            iconName="heart-outline"
            title="No favourites yet"
            subtitle="Tap the heart icon on any character card to save them here."
          />
        }
        contentContainerStyle={[
          styles.listContent,
          favouriteCharacters.length === 0 && styles.emptyContent,
        ]}
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
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.fontSizeXL,
    fontWeight: Typography.fontWeightBold,
    color: Colors.textPrimary,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.dead + '18',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dead + '40',
  },
  clearText: {
    fontSize: Typography.fontSizeSM,
    color: Colors.dead,
    fontWeight: Typography.fontWeightMedium,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  offlineText: {
    fontSize: Typography.fontSizeXS,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  listContent: {
    paddingBottom: Spacing.xxxl,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FavouritesScreen;
