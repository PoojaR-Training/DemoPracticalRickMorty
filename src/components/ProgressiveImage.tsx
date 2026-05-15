/**
 * @fileoverview ProgressiveImage - fades from a tiny blurred placeholder to the full resolution image.
 * Used in all FlatList image cells for a smooth perceived-loading experience.
 */

import React, { useState, useRef } from 'react';
import {
  Animated,
  Image,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../theme';

interface ProgressiveImageProps {
  uri: string;
  width: number;
  height: number;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  borderRadius?: number;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  uri,
  width,
  height,
  style,
  containerStyle,
  borderRadius = 0,
}) => {
  const [fullLoaded, setFullLoaded] = useState(false);
  const fullImageOpacity = useRef(new Animated.Value(0)).current;

  const onFullLoad = () => {
    setFullLoaded(true);
    Animated.timing(fullImageOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const thumbnailUri = uri;

  return (
    <View
      style={[
        styles.container,
        { width, height, borderRadius },
        containerStyle,
      ]}>
      {!fullLoaded && (
        <Image
          source={{ uri: thumbnailUri }}
          style={[
            styles.image,
            { width, height, borderRadius },
            styles.thumbnail,
            style,
          ]}
          blurRadius={8}
          resizeMode="cover"
        />
      )}
      <Animated.Image
        source={{ uri }}
        style={[
          styles.image,
          { width, height, borderRadius, opacity: fullImageOpacity },
          style,
        ]}
        onLoad={onFullLoad}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.skeletonBase,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  thumbnail: {
    opacity: 0.6,
  },
});

export default ProgressiveImage;
