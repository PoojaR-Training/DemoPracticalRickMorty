/**
 * @fileoverview DetailInfoRow - one labelled metadata row on the detail screen.
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, BorderRadius } from '../../../theme';

interface DetailInfoRowProps {
  iconName: string;
  label: string;
  value: string;
  valueColor?: string;
}

const DetailInfoRow: React.FC<DetailInfoRowProps> = memo(
  ({ iconName, label, value, valueColor }) => {
    const displayValue = value && value !== '' ? value : '—';

    return (
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Icon name={iconName} size={16} color={Colors.primary} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.label}>{label}</Text>
          <Text
            style={[styles.value, valueColor ? { color: valueColor } : null]}
            numberOfLines={2}>
            {displayValue}
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightMedium,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    fontSize: Typography.fontSizeMD,
    fontWeight: Typography.fontWeightSemiBold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeightMD,
  },
});

export default DetailInfoRow;
