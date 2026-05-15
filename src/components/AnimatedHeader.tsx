/**
 * @fileoverview AnimatedHeader - wraps any header content with animated translateY hide/show.
 * Works together with useScrollHeader hook.
 */

import React from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { Colors, HEADER_HEIGHT } from '../theme';

interface AnimatedHeaderProps {
  translateY: Animated.Value;
  children: React.ReactNode;
  style?: ViewStyle;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  translateY,
  children,
  style,
}) => {
  return (
    <Animated.View
      style={[
        styles.header,
        { transform: [{ translateY }] },
        style,
      ]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: HEADER_HEIGHT,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'center',
  },
});

export default AnimatedHeader;
