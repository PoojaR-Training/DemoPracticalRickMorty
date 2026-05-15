/**
 * @fileoverview CharacterFilters - collapsible filter panel with status & gender chips.
 */

import React, { memo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, BorderRadius } from '../../../theme';
import { GENDER_OPTIONS, STATUS_OPTIONS } from '../../../types/api.types';

interface CharacterFiltersProps {
  activeStatus: string;
  activeGender: string;
  onStatusChange: (value: string) => void;
  onGenderChange: (value: string) => void;
}
const genderActiveColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  Male: { bg: 'rgba(96,165,250,0.15)', border: '#60A5FA', text: '#60A5FA' },
  Female: { bg: 'rgba(244,114,182,0.15)', border: '#F472B6', text: '#F472B6' },
  Genderless: {
    bg: 'rgba(167,139,250,0.15)',
    border: '#A78BFA',
    text: '#A78BFA',
  },
  '': { bg: Colors.primaryMuted, border: Colors.primary, text: Colors.primary },
};

const statusActiveColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  Alive: { bg: 'rgba(52,211,153,0.15)', border: '#34D399', text: '#34D399' },
  Dead: { bg: 'rgba(248,113,113,0.15)', border: '#F87171', text: '#F87171' },
  unknown: { bg: 'rgba(156,163,175,0.15)', border: '#9CA3AF', text: '#9CA3AF' },
  '': { bg: Colors.primaryMuted, border: Colors.primary, text: Colors.primary },
};

const CharacterFilters: React.FC<CharacterFiltersProps> = memo(
  ({ activeStatus, activeGender, onStatusChange, onGenderChange }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionLabel}>Status</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {STATUS_OPTIONS.map(opt => {
            const isActive = activeStatus === opt.value;
            const ac = statusActiveColors[opt.value] ?? statusActiveColors[''];
            return (
              <TouchableOpacity
                key={String(opt.value)}
                style={[
                  styles.chip,
                  isActive && {
                    backgroundColor: ac.bg,
                    borderColor: ac.border,
                  },
                ]}
                onPress={() => onStatusChange(opt.value)}
                activeOpacity={0.75}
              >
                <MaterialCommunityIcons
                  name={opt.icon}
                  size={14}
                  color={isActive ? ac.text : Colors.textMuted}
                />
                <Text
                  style={[
                    styles.chipText,
                    isActive && {
                      color: ac.text,
                      fontWeight: Typography.fontWeightSemiBold,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionLabel}>Gender</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {GENDER_OPTIONS.map(opt => {
            const isActive = activeGender === opt.value;
            const ac = genderActiveColors[opt.value] ?? genderActiveColors[''];
            return (
              <TouchableOpacity
                key={String(opt.value)}
                style={[
                  styles.chip,
                  isActive && {
                    backgroundColor: ac.bg,
                    borderColor: ac.border,
                  },
                ]}
                onPress={() => onGenderChange(opt.value)}
                activeOpacity={0.75}
              >
                <MaterialCommunityIcons
                  name={opt.icon}
                  size={14}
                  color={isActive ? ac.text : Colors.textMuted}
                />
                <Text
                  style={[
                    styles.chipText,
                    isActive && {
                      color: ac.text,
                      fontWeight: Typography.fontWeightSemiBold,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs + 2,
    paddingVertical: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.xs,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.lg,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 3,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipText: {
    fontSize: Typography.fontSizeSM,
    fontWeight: Typography.fontWeightMedium,
    color: Colors.textSecondary,
  },
});

export default CharacterFilters;
