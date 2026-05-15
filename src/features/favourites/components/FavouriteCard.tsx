/**
 * @fileoverview FavouriteCard - card for the favourites tab. Shows remove option.
 */

import React, { memo, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Character } from '../../../types/api.types';
import ProgressiveImage from '../../../components/ProgressiveImage';
import StatusBadge from '../../../components/StatusBadge';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
} from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';

interface FavouriteCardProps {
  character: Character;
  onRemove: (id: number) => void;
}

const FavouriteCard: React.FC<FavouriteCardProps> = memo(
  ({ character, onRemove }) => {
    const AnimatedGradient =
      Animated.createAnimatedComponent(LinearGradient);
    
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

      onRemove(character.id);
    };

    const animatedFabStyle = {
      transform: [{ scale: fabScale }],
    };

    return (
      <View style={styles.card}>
        <ProgressiveImage
          uri={character.image}
          width={80}
          height={80}
          borderRadius={BorderRadius.md}
        />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {character.name}
          </Text>
          <StatusBadge status={character.status} gender={character.gender} />
          <View style={styles.metaRow}>
            <Icon name="dna" size={12} color={Colors.textMuted} />
            <Text style={styles.metaText}>{character.species}</Text>
          </View>
          <View style={styles.metaRow}>
            <Icon
              name="map-marker-outline"
              size={12}
              color={Colors.textMuted}
            />
            <Text style={styles.metaText} numberOfLines={1}>
              {character.location.name}
            </Text>
          </View>
        </View>
        <AnimatedGradient
          colors={['#ff4d6d', '#ff758f']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.fab, animatedFabStyle, styles.fabActive]}
        >
          <TouchableOpacity
            onPress={handleFavPress}
            style={styles.fabTouchable}
            activeOpacity={0.9}
          >
            <Icon name={'heart'} size={20} color={'#FFFFFF'} />
          </TouchableOpacity>
        </AnimatedGradient>
      </View>
    );
  },
);

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
    alignItems: 'center',
    ...Shadows.card,
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  name: {
    fontSize: Typography.fontSizeMD,
    fontWeight: Typography.fontWeightBold,
    color: Colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    flex: 1,
    fontSize: Typography.fontSizeXS,
    color: Colors.textSecondary,
  },
  removeButton: {
    padding: Spacing.xs,
  },
  
  fab: {
    width: 40,
    height: 40,
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

export default FavouriteCard;
