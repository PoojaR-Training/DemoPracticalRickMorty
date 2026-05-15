/**
 * @fileoverview EpisodeCard - displays a single episode with code, name, and air date.
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
import { Episode } from '../../../types/api.types';
import { useEpisodeCharacters } from '../hooks/useEpisodeCharacters';
import ProgressiveImage from '../../../components/ProgressiveImage';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { Colors, Spacing, Typography, BorderRadius } from '../../../theme';

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = memo(({ episode }) => {
  const [expanded, setExpanded] = useState(false);
  const { characters, isLoading } = useEpisodeCharacters(
    expanded ? episode : undefined,
  );

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(prev => !prev)}
        activeOpacity={0.85}
      >
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{episode.episode}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {episode.name}
          </Text>
          <Text style={styles.date}>{episode.air_date}</Text>
        </View>
        <View style={styles.metaRight}>
          <View style={styles.castCount}>
            <Icon name="account-group" size={13} color={Colors.textMuted} />
            <Text style={styles.castCountText}>
              {episode.characters.length}
            </Text>
          </View>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={Colors.textMuted}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.castContainer}>
          {isLoading ? (
            <View style={styles.castSkeletons}>
              {Array.from({ length: 6 }).map((_, i) => (
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
                <View style={styles.avatarWrapper}>
                  <ProgressiveImage
                    uri={item.image}
                    width={44}
                    height={44}
                    borderRadius={22}
                  />
                </View>
              )}
              contentContainerStyle={styles.castList}
            />
          )}
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
  codeBadge: {
    backgroundColor: Colors.primaryMuted,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  codeText: {
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightBold,
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: Typography.fontSizeMD,
    fontWeight: Typography.fontWeightSemiBold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeightMD,
  },
  date: {
    fontSize: Typography.fontSizeXS,
    color: Colors.textMuted,
  },
  metaRight: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  castCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  castCountText: {
    fontSize: Typography.fontSizeXS,
    color: Colors.textMuted,
  },
  castContainer: {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: Spacing.md,
  },
  castSkeletons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: 2,
  },
  castList: {
    paddingHorizontal: 2,
    gap: Spacing.sm,
  },
  avatarWrapper: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.primary + '60',
    overflow: 'hidden',
  },
});

export default EpisodeCard;
