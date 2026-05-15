/**
 * @fileoverview SearchBar - styled text input with a search icon and clear button.
 */


import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Spacing, Typography, BorderRadius } from '../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  showFilter?: boolean;
  filterActive?: boolean;
  onFilterPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search…',
  style,
  showFilter = false,
  filterActive = false,
  onFilterPress,
}) => {
  return (
    <View style={styles.wrap}>
      <View style={[styles.container, style]}>
        <Icon name="search" size={18} color={Colors.textMuted} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon name="x-circle" size={17} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {showFilter && (
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterActive && styles.filterBtnActive,
          ]}
          onPress={onFilterPress}
          activeOpacity={0.7}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Icon
            name="sliders"
            size={18}
            color={filterActive ? Colors.primary : Colors.textMuted}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  filterBtn: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.full,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterBtnActive: {
    backgroundColor: Colors.primaryMuted,
    borderColor: Colors.primary,
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSizeMD,
    color: Colors.textPrimary,
    padding: 0,
    margin: 0,
  },
});

export default SearchBar;