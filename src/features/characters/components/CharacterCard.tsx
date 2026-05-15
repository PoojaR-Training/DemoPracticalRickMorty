/**
 * @fileoverview CharacterCard - list card with Reanimated 2 press animation.Pressing the card scales it down with an elevated shadow effect, then navigates to the CharacterDetail screen.
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

interface CharacterCardProps {
  character: Character;
  onPress: (character: Character) => void;
  isFavourite: boolean;
  onToggleFavourite: (character: Character) => void;
}


const CharacterCard: React.FC<CharacterCardProps> = memo(
  ({ character, onPress, isFavourite, onToggleFavourite }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 4,
      }).start();
    };

    return (
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={styles.touchable}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => onPress(character)}
          activeOpacity={1}>
          <ProgressiveImage
            uri={character.image}
            width={88}
            height={88}
            borderRadius={BorderRadius.md}
          />

          <View style={styles.content}>
            <View style={styles.topRow}>
              <Text style={styles.name} numberOfLines={1}>
                {character.name}
              </Text>
              <TouchableOpacity
                onPress={() => onToggleFavourite(character)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Icon
                  name={isFavourite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isFavourite ? Colors.dead : Colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <StatusBadge status={character.status} gender={character.gender}/>

            <View style={styles.metaRow}>
              <Icon name="dna" size={13} color={Colors.textMuted} />
              <Text style={styles.metaText} numberOfLines={1}>
                {character.species}
              </Text>
            </View>

            <View style={styles.metaRow}>
              <Icon name="map-marker-outline" size={13} color={Colors.textMuted} />
              <Text style={styles.metaText} numberOfLines={1}>
                {character.location.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    ...Shadows.card,
  },
  touchable: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeightLG,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    flex: 1,
    fontSize: Typography.fontSizeSM,
    color: Colors.textSecondary,
  },
});

export default CharacterCard;