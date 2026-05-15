/**
 * @fileoverview EmptyState - shown when a list has no results to display.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography } from '../theme';

interface EmptyStateProps {
  iconName?: string;
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = 'ghost-outline',
  title = 'Nothing here',
  subtitle = 'Try adjusting your search or filters.',
}) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={56} color={Colors.textMuted} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.section * 2,
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xxxl,
  },
  title: {
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightSemiBold,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSizeSM,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.lineHeightMD,
  },
});

export default EmptyState;
