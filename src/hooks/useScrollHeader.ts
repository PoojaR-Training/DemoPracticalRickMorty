/**
 * @fileoverview useScrollHeader - animates the header off/on screen based on scroll direction.
 */

import { useRef, useCallback } from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { HEADER_HEIGHT } from '../theme';

interface UseScrollHeaderReturn {
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  headerTranslateY: Animated.Value;
  scrollEventThrottle: number;
}

export function useScrollHeader(): UseScrollHeaderReturn {
  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const currentTranslate = useRef(0);

  const scrollHandler = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) < 3) {
        lastScrollY.current = currentScrollY;
        return;
      }

      let newTranslate = currentTranslate.current;

      if (diff > 0 && currentScrollY > HEADER_HEIGHT) {
        newTranslate = Math.min(currentTranslate.current + diff, HEADER_HEIGHT);
      } else if (diff < 0) {
        newTranslate = Math.max(currentTranslate.current + diff, 0);
      }

      if (newTranslate !== currentTranslate.current) {
        currentTranslate.current = newTranslate;
        Animated.timing(headerTranslateY, {
          toValue: -newTranslate,
          duration: 120,
          useNativeDriver: true,
        }).start();
      }

      lastScrollY.current = currentScrollY;
    },
    [headerTranslateY],
  );

  return {
    scrollHandler,
    headerTranslateY,
    scrollEventThrottle: 16,
  };
}
