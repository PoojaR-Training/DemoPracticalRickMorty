/**
 * @fileoverview LocationCard - expandable card showing location details and residents.
 */

import React, { memo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Location } from '../../../types/api.types';
import { useLocationResidents } from '../hooks/useLocationResidents';
import ProgressiveImage from '../../../components/ProgressiveImage';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { Colors, Spacing, Typography, BorderRadius } from '../../../theme';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = memo(({ location }) => {
  const [expanded, setExpanded] = useState(false);
  const { characters, isLoading } = useLocationResidents(
    expanded ? location : undefined,
  );

  return (
    <View
      style={styles.card}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(prev => !prev)}
        activeOpacity={0.85}
      >
        <View style={styles.iconContainer}>
          <Icon name="map-marker-radius" size={24} color={Colors.primary} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {location.name}
          </Text>
          <View style={styles.tags}>
            {location.type !== 'unknown' && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{location.type}</Text>
              </View>
            )}
            {location.dimension !== 'unknown' && (
              <View style={[styles.tag, styles.tagAlt]}>
                <Text style={[styles.tagText, styles.tagTextAlt]}>
                  {location.dimension.length > 20
                    ? location.dimension.slice(0, 18) + '…'
                    : location.dimension}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.metaRight}>
          <View style={styles.residentCount}>
            <Icon name="account-multiple" size={13} color={Colors.textMuted} />
            <Text style={styles.residentCountText}>
              {location.residents.length}
            </Text>
          </View>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={Colors.textMuted}
          />
        </View>
      </TouchableOpacity>

      {expanded && location.residents.length > 0 && (
        <View style={styles.residentsContainer}>
          {isLoading ? (
            <View style={styles.skeletonRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonLoader
                  key={i}
                  width={44}
                  height={44}
                  borderRadius={22}
                />
              ))}
            </View>
          ) : (
            <FlatList
              data={characters}
              horizontal
              keyExtractor={item => String(item.id)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.residentItem}>
                  <ProgressiveImage
                    uri={item.image}
                    width={44}
                    height={44}
                    borderRadius={22}
                  />
                  <Text style={styles.residentName} numberOfLines={1}>
                    {item.name.split(' ')[0]}
                  </Text>
                </View>
              )}
              contentContainerStyle={styles.residentsList}
            />
          )}
        </View>
      )}

      {expanded && location.residents.length === 0 && (
        <View style={styles.noResidents}>
          <Text style={styles.noResidentsText}>No known residents</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  info: {
    flex: 1,
    gap: Spacing.xs,
  },
  name: {
    fontSize: Typography.fontSizeMD,
    fontWeight: Typography.fontWeightSemiBold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeightMD,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  tag: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagAlt: {
    borderColor: Colors.secondary + '60',
    backgroundColor: Colors.secondary + '15',
  },
  tagText: {
    fontSize: Typography.fontSizeXS,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeightMedium,
  },
  tagTextAlt: {
    color: '#A78BFA',
  },
  metaRight: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  residentCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  residentCountText: {
    fontSize: Typography.fontSizeXS,
    color: Colors.textMuted,
  },
  residentsContainer: {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: Spacing.md,
  },
  skeletonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  residentsList: {
    gap: Spacing.md,
    paddingHorizontal: 2,
  },
  residentItem: {
    alignItems: 'center',
    gap: Spacing.xs,
    width: 52,
  },
  residentName: {
    fontSize: 9,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  noResidents: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    alignItems: 'center',
  },
  noResidentsText: {
    fontSize: Typography.fontSizeSM,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});

export default LocationCard;
