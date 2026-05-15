/**
 * @fileoverview CharactersListHeader - search bar + filter chips
 */


import React, { memo, useState } from 'react';
import { StyleSheet, View, LayoutAnimation, Platform, UIManager } from 'react-native';
import SearchBar from '../../../components/SearchBar';
import CharacterFiltersComponent from './CharacterFilters';
import { Spacing, HEADER_HEIGHT } from '../../../theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface CharactersListHeaderProps {
  searchValue: string;
  onSearchChange: (text: string) => void;
  activeStatus: string;
  activeGender: string;
  onStatusChange: (value: string) => void;
  onGenderChange: (value: string) => void;
}

const CharactersListHeader: React.FC<CharactersListHeaderProps> = memo(
  ({
    searchValue,
    onSearchChange,
    activeStatus,
    activeGender,
    onStatusChange,
    onGenderChange,
  }) => {
    const [filtersVisible, setFiltersVisible] = useState(false);

    const hasActiveFilters =
      (activeStatus !== '' && activeStatus !== undefined) ||
      (activeGender !== '' && activeGender !== undefined);

    const handleFilterPress = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setFiltersVisible(prev => !prev);
    };

    return (
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <SearchBar
            value={searchValue}
            onChangeText={onSearchChange}
            placeholder="Search characters…"
            showFilter
            filterActive={filtersVisible || hasActiveFilters}
            onFilterPress={handleFilterPress}
          />
        </View>

        {filtersVisible && (
          <CharacterFiltersComponent
            activeStatus={activeStatus}
            activeGender={activeGender}
            onStatusChange={onStatusChange}
            onGenderChange={onGenderChange}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingTop: HEADER_HEIGHT + Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  searchRow: {
    marginHorizontal: Spacing.md,
  },
});

export default CharactersListHeader;