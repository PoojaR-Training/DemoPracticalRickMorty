/**
 * @fileoverview DetailEpisodeChip - compact episode pill card for the horizontally scrollable episodes
 */

import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { Episode } from '../../../types/api.types';
import { Colors, Spacing, Typography, BorderRadius } from '../../../theme';

interface DetailEpisodeChipProps {
  episode: Episode;
  index: number;
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const DetailEpisodeChip: React.FC<DetailEpisodeChipProps> = memo(
  ({ episode, index }) => {
    const translateY = useRef(new Animated.Value(24)).current;

    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const delay = Math.min(index * 55, 400);

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          delay,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          delay,
          useNativeDriver: true,
        }),
      ]).start();
    }, [index, opacity, translateY]);

    const animatedStyle = {
      opacity,
      transform: [{ translateY }],
    };

    return (
      <AnimatedGradient
        colors={['#1F2937', '#111827']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.chip, animatedStyle]}
      >
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{episode.episode}</Text>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {episode.name}
        </Text>
        <Text style={styles.date}>{episode.air_date}</Text>
      </AnimatedGradient>
    );
  },
);

const styles = StyleSheet.create({
  chip: {
    width: 140,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.xs,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#00D4FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  codeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryMuted,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  codeText: {
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightBold,
    color: Colors.primary,
    letterSpacing: 0.4,
  },
  name: {
    fontSize: Typography.fontSizeSM,
    fontWeight: Typography.fontWeightSemiBold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeightMD,
  },
  date: {
    fontSize: Typography.fontSizeXS,
    color: Colors.textMuted,
  },
});

export default DetailEpisodeChip;
