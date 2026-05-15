/**
 * @fileoverview StatusBadge - coloured pill badge for character alive/dead/unknown status,
 * with an additional gender capsule indicator.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CharacterGender, CharacterStatus } from '../types/api.types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

interface StatusBadgeProps {
  status: CharacterStatus;
  gender: CharacterGender;
}

const statusConfig: Record<CharacterStatus, { color: string; dot: string }> = {
  Alive: { color: Colors.alive, dot: Colors.alive },
  Dead: { color: Colors.dead, dot: Colors.dead },
  unknown: { color: Colors.unknown, dot: Colors.unknown },
};

const genderConfig: Record<
  CharacterGender,
  { color: string; bg: string; icon: string; label: string }
> = {
  Male: {
    color: '#60A5FA',
    bg: 'rgba(96,165,250,0.12)',
    icon: '♂',
    label: 'Male',
  },
  Female: {
    color: '#F472B6',
    bg: 'rgba(244,114,182,0.12)',
    icon: '♀',
    label: 'Female',
  },
  Genderless: {
    color: '#A78BFA',
    bg: 'rgba(167,139,250,0.12)',
    icon: '⚬',
    label: 'Genderless',
  },
  unknown: {
    color: '#9CA3AF',
    bg: 'rgba(156,163,175,0.12)',
    icon: '?',
    label: 'Unknown',
  },
};


const StatusBadge: React.FC<StatusBadgeProps> = ({ status, gender }) => {
  const sConfig = statusConfig[status] ?? statusConfig.unknown;
  const gConfig = genderConfig[gender] ?? genderConfig.unknown;

  return (
    <View style={styles.row}>
      <View style={[styles.badge, { borderColor: sConfig.color + '40' }]}>
        <View style={[styles.dot, { backgroundColor: sConfig.dot }]} />
        <Text style={[styles.label, { color: sConfig.color }]}>{status}</Text>
      </View>

      <View
        style={[
          styles.badge,
          styles.genderCapsule,
          { borderColor: gConfig.color + '40', backgroundColor: gConfig.bg },
        ]}
      >
        <Text style={[styles.genderIcon, { color: gConfig.color }]}>
          {gConfig.icon}
        </Text>
        <Text style={[styles.label, { color: gConfig.color }]}>
          {gConfig.label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    gap: Spacing.xs,
  },
  genderCapsule: {
    paddingHorizontal: Spacing.sm + 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  genderIcon: {
    fontSize: Typography.fontSizeXS + 1,
    lineHeight: Typography.fontSizeXS + 3,
  },
  label: {
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightSemiBold,
    letterSpacing: 0.4,
  },
});

export default StatusBadge;
