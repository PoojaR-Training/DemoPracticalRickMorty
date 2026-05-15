/**
 * @fileoverview DetailHeroImage - large avatar section for the detail screen.
 */

import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgressiveImage from '../../../components/ProgressiveImage';
import { Colors } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HERO_HEIGHT = SCREEN_WIDTH * 0.75;

interface DetailHeroImageProps {
  uri: string;
  placeholderUri?: string;
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const DetailHeroImage: React.FC<DetailHeroImageProps> = ({ uri }) => {
  const scale = useRef(new Animated.Value(0.88)).current;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  const animatedStyle = {
    opacity,
    transform: [{ scale }],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ProgressiveImage
        uri={uri}
        width={SCREEN_WIDTH}
        height={HERO_HEIGHT}
        borderRadius={0}
        style={styles.image}
      />
      <AnimatedGradient
        colors={['transparent', Colors.background]}
        style={styles.gradient}
        pointerEvents="none"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },

  image: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },

  gradient: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,

    height: HERO_HEIGHT * 0.5,
  },
});

export default DetailHeroImage;
