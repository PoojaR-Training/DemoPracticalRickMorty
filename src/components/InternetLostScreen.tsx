/**
 * @fileoverview InternetLostScreen
 * Full-screen "No Internet" placeholder shown when the device goes offline.
 */
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '../theme';

interface Props {
  onRetry?: () => void;
}

const InternetLostScreen: React.FC<Props> = ({ onRetry }) => {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulse]);

  const handleRetry = () => {
    NetInfo.fetch().then(() => {
      onRetry?.();
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconWrapper, { transform: [{ scale: pulse }] }]}>
        <Icon name="wifi-off" size={72} color={Colors.primary} />
      </Animated.View>

      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please check your Wi-Fi or mobile data and try again.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleRetry} activeOpacity={0.8}>
        <Icon name="refresh" size={18} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 32,
  },
  iconWrapper: {
    marginBottom: 28,
    padding: 24,
    borderRadius: 64,
    backgroundColor: Colors.tabBarBg,
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  title: {
    fontSize: Typography.fontSizeLG ?? 20,
    fontWeight: Typography.fontWeightBold ?? '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: Typography.fontSizeSM ?? 14,
    color: Colors.textSecondary ?? '#aaa',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 50,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: Typography.fontSizeMD ?? 16,
    fontWeight: Typography.fontWeightSemiBold ?? '600',
  },
});

export default InternetLostScreen;
