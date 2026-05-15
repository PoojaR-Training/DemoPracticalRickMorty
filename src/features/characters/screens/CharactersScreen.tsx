/**
 * @fileoverview CharactersScreen - infinite scroll character list with search and filters.
 */

import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setCharacterSearch,
  setCharacterStatus,
  setCharacterGender,
} from '../../../store/slices/uiSlice';
import {
  addFavourite,
  removeFavourite,
} from '../../../store/slices/favouritesSlice';
import { useDebounce } from '../../../hooks/useDebounce';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from '../components/CharacterCard';
import CharacterCardSkeleton from '../components/CharacterCardSkeleton';
import CharactersListHeader from '../components/CharactersListHeader';
import AnimatedHeader from '../../../components/AnimatedHeader';
import EmptyState from '../../../components/EmptyState';
import type { Character } from '../../../types/api.types';
import type { CharactersStackParamList } from '../../../navigation/types';
import { Colors, Spacing, Typography } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const SKELETON_COUNT = 8;

type CharactersNavProp = NativeStackNavigationProp<
  CharactersStackParamList,
  'CharactersList'
>;

const CharactersScreen: React.FC = () => {
  const navigation = useNavigation<CharactersNavProp>();
  const dispatch = useAppDispatch();
  const { characterFilters } = useAppSelector(state => state.ui);
  const { ids: favouriteIds } = useAppSelector(state => state.favourites);

  const [searchInput, setSearchInput] = useState(characterFilters.search);
  const debouncedSearch = useDebounce(searchInput, 300);
  const { scrollHandler, headerTranslateY, scrollEventThrottle } =
    useScrollHeader();

  const {
    characters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useCharacters({
    name: debouncedSearch,
    status: characterFilters.status as never,
    gender: characterFilters.gender as never,
  });

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchInput(text);
      dispatch(setCharacterSearch(text));
    },
    [dispatch],
  );

  const handleCardPress = useCallback(
    (character: Character) => {
      navigation.navigate('CharacterDetail', {
        characterId: character.id,
        imageUri: character.image,
        characterName: character.name,
      });
    },
    [navigation],
  );

  const handleToggleFavourite = useCallback(
    (character: Character) => {
      if (favouriteIds.includes(character.id)) {
        dispatch(removeFavourite(character.id));
      } else {
        dispatch(addFavourite(character));
      }
    },
    [dispatch, favouriteIds],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <CharacterCard
        character={item}
        onPress={handleCardPress}
        isFavourite={favouriteIds.includes(item.id)}
        onToggleFavourite={handleToggleFavourite}
      />
    ),
    [favouriteIds, handleCardPress, handleToggleFavourite],
  );

  const renderFooter = useCallback(
    () =>
      isFetchingNextPage ? (
        <ActivityIndicator
          color={Colors.primary}
          style={styles.footerLoader}
          size="small"
        />
      ) : null,
    [isFetchingNextPage],
  );

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader translateY={headerTranslateY}>
        <Text style={styles.headerTitle}>Characters</Text>
      </AnimatedHeader>

      <FlatList
        data={isLoading ? [] : characters}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={
          <CharactersListHeader
            searchValue={searchInput}
            onSearchChange={handleSearchChange}
            activeStatus={characterFilters.status}
            activeGender={characterFilters.gender}
            onStatusChange={v => dispatch(setCharacterStatus(v))}
            onGenderChange={v => dispatch(setCharacterGender(v))}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.skeletons}>
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <CharacterCardSkeleton key={i} />
              ))}
            </View>
          ) : (
            <EmptyState
              iconName="ghost-outline"
              title="No characters found"
              subtitle="Try a different name or filter."
            />
          )
        }
        contentContainerStyle={[
          styles.listContent,
          characters.length === 0 && isLoading && styles.grow,
        ]}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerTitle: {
    fontSize: Typography.fontSizeXL,
    fontWeight: Typography.fontWeightBold,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.lg,
  },
  listContent: { paddingBottom: Spacing.xxxl },
  grow: { flexGrow: 1 },
  skeletons: { gap: 0 },
  footerLoader: { paddingVertical: Spacing.xl },
});

export default CharactersScreen;
