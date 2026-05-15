/**
 * @fileoverview CharacterDetailScreen - full character detail view.
 */

import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { useCharacterEpisodes } from '../hooks/useCharacterEpisodes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addFavourite,
  removeFavourite,
} from '../../../store/slices/favouritesSlice';
import type { CharacterDetailScreenProps } from '../../../navigation/types';
import type { CharactersStackParamList } from '../../../navigation/types';
import DetailHeroImage from '../components/DetailHeroImage';
import DetailContent from '../components/DetailContent';
import DetailSkeletonScreen from '../components/DetailSkeletonScreen';
import ErrorFallback from '../../../components/ErrorFallback';
import { Colors, Spacing } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavProp = NativeStackNavigationProp<
  CharactersStackParamList,
  'CharacterDetail'
>;

const CharacterDetailScreen: React.FC<CharacterDetailScreenProps> = ({
  route,
}) => {
  const { characterId, imageUri } = route.params;

  const navigation = useNavigation<NavProp>();
  const dispatch = useAppDispatch();
  const { ids: favouriteIds } = useAppSelector(state => state.favourites);

  const { character, isLoading, isError, refetch } =
    useCharacterDetail(characterId);
  const { episodes, isLoading: episodesLoading } = useCharacterEpisodes(
    character?.episode ?? [],
  );

  const isFavourite = favouriteIds.includes(characterId);

  const handleToggleFavourite = useCallback(() => {
    if (!character) return;
    if (isFavourite) {
      dispatch(removeFavourite(character.id));
    } else {
      dispatch(addFavourite(character));
    }
  }, [character, dispatch, isFavourite]);

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorFallback
          message="Couldn't load this character. Check your connection."
          onRetry={refetch}
        />
      </SafeAreaView>
    );
  }

  if (isLoading || !character) {
    return (
      <SafeAreaView style={styles.container}>
        <DetailHeroImage uri={imageUri} />
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backTouchable}
          >
            <Icon name="arrow-left" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <DetailSkeletonScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DetailHeroImage uri={character.image} />

        <DetailContent
          character={character}
          episodes={episodes}
          episodesLoading={episodesLoading}
          isFavourite={isFavourite}
          onToggleFavourite={handleToggleFavourite}
        />
      </ScrollView>

      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backTouchable}
          activeOpacity={0.85}
        >
          <Icon name="arrow-left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xl,
    left: Spacing.lg,
    zIndex: 10,
  },
  backTouchable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
});

export default CharacterDetailScreen;
