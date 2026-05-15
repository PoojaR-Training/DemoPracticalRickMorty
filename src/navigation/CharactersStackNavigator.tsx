/**
 * @fileoverview CharactersStackNavigator - containing the character list and detail screens.
 */

import React, { Suspense, lazy } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CharactersStackParamList } from './types';
import { Colors, Spacing } from '../theme';

const charactersScreenImport = import(
  '../features/characters/screens/CharactersScreen'
);
const characterDetailScreenImport = import(
  '../features/characters/screens/CharacterDetailScreen'
);

const CharactersScreen = lazy(() => charactersScreenImport);
const CharacterDetailScreen = lazy(() => characterDetailScreenImport);

const Stack = createNativeStackNavigator<CharactersStackParamList>();

const ScreenLoader: React.FC = () => (
  <View style={styles.loader}>
    <ActivityIndicator color={Colors.primary} size="large" />
    <Text
      style={styles.loadingText}
    >
      {'Lazy Loading'}
    </Text>
  </View>
);

const CharactersStackNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CharactersList">
      {() => (
        <Suspense fallback={<ScreenLoader />}>
          <CharactersScreen />
        </Suspense>
      )}
    </Stack.Screen>

    <Stack.Screen
      name="CharacterDetail"
      options={{
        animation: 'fade_from_bottom',
        animationDuration: 320,
      }}
    >
      {props => (
        <Suspense fallback={<ScreenLoader />}>
          <CharacterDetailScreen {...props} />
        </Suspense>
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  loadingText:{ color: Colors.textPrimary, fontSize: 8, marginTop: Spacing.sm }
});

export default CharactersStackNavigator;
