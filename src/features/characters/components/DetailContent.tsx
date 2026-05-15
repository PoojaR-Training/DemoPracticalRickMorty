/**
 * @fileoverview DetailContent - scrollable body of CharacterDetailScreen.
 */

import React, { memo, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { Character, Episode } from '../../../types/api.types';
import StatusBadge from '../../../components/StatusBadge';
import DetailInfoRow from './DetailInfoRow';
import DetailEpisodesRow from './DetailEpisodesRow';
import { Colors, Spacing, Typography } from '../../../theme';

interface DetailContentProps {
  character: Character;
  episodes: Episode[];
  episodesLoading: boolean;
  isFavourite: boolean;
  onToggleFavourite: () => void;
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const DetailContent: React.FC<DetailContentProps> = memo(
  ({
    character,
    episodes,
    episodesLoading,
    isFavourite,
    onToggleFavourite,
  }) => {
    const fabScale = useRef(new Animated.Value(1)).current;

    const handleFavPress = () => {
      Animated.sequence([
        Animated.spring(fabScale, {
          toValue: 0.88,
          useNativeDriver: true,
        }),
        Animated.spring(fabScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      onToggleFavourite();
    };

    const animatedFabStyle = {
      transform: [{ scale: fabScale }],
    };

    const createdDate = new Date(character.created).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    );

    return (
      <View style={styles.container}>
        <View style={styles.nameRow}>
          <View style={styles.nameSide}>
            <Text style={styles.name}>{character.name}</Text>

            <StatusBadge status={character.status} gender={character.gender} />
          </View>

          <AnimatedGradient
            colors={
              isFavourite ? ['#ff4d6d', '#ff758f'] : ['#2d2d2d', '#1f1f1f']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.fab,
              animatedFabStyle,
              isFavourite && styles.fabActive,
            ]}
          >
            <TouchableOpacity
              onPress={handleFavPress}
              style={styles.fabTouchable}
              activeOpacity={0.9}
            >
              <Icon
                name={isFavourite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavourite ? '#FFFFFF' : Colors.textSecondary}
              />
            </TouchableOpacity>
          </AnimatedGradient>
        </View>

        <View style={styles.divider} />

        <DetailInfoRow
          iconName="dna"
          label="Species"
          value={character.species}
        />

        <DetailInfoRow
          iconName="tag-outline"
          label="Type"
          value={character.type || 'N/A'}
          valueColor={character.type ? Colors.textPrimary : Colors.textMuted}
        />

        <DetailInfoRow
          iconName="gender-male-female"
          label="Gender"
          value={character.gender}
        />

        <DetailInfoRow
          iconName="home-map-marker"
          label="Origin"
          value={character.origin.name}
          valueColor={Colors.accent}
        />

        <DetailInfoRow
          iconName="map-marker-radius"
          label="Last Known Location"
          value={character.location.name}
          valueColor={Colors.primary}
        />

        <DetailInfoRow
          iconName="calendar-outline"
          label="First Seen"
          value={createdDate}
        />

        <View style={styles.divider} />

        {/* Episodes */}
        <DetailEpisodesRow
          episodes={episodes}
          isLoading={episodesLoading}
          totalCount={character.episode.length}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.section,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },

  nameSide: {
    flex: 1,
    gap: Spacing.sm,
  },

  name: {
    fontSize: Typography.fontSize2XL,
    fontWeight: Typography.fontWeightBold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeightXL,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.lg,
    marginHorizontal: -Spacing.lg,
  },

  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginTop: Spacing.xs,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 4,
  },

  fabActive: {
    borderColor: Colors.dead + '55',
  },

  fabTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailContent;
