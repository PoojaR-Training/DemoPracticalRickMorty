/**
 * @fileoverview AppNavigator - bottom tab navigation.
 */
import React, { Suspense, lazy } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CharactersStackNavigator from './CharactersStackNavigator';
import type { RootTabParamList } from './types';
import { Colors, Typography, TAB_BAR_HEIGHT, Spacing } from '../theme';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import InternetLostScreen from '../components/InternetLostScreen';

// ─── Eager preload ────────────────────────────────────────────────────────────
const episodesImport = import('../features/episodes/screens/EpisodesScreen');
const locationsImport = import('../features/locations/screens/LocationsScreen');
const favouritesImport = import(
  '../features/favourites/screens/FavouritesScreen'
);

const EpisodesScreen = lazy(() => episodesImport);
const LocationsScreen = lazy(() => locationsImport);
const FavouritesScreen = lazy(() => favouritesImport);

const ScreenLoader: React.FC = () => (
  <View style={styles.loader}>
    <ActivityIndicator color={Colors.primary} size="large" />
    <Text style={styles.loadingText}>{'Lazy Loading'}</Text>
  </View>
);

const withOfflineGuard = (WrappedComponent: React.ComponentType): React.FC => {
  const Guarded: React.FC = props => {
    const isConnected = useNetworkStatus();
    if (!isConnected) return <InternetLostScreen />;
    return <WrappedComponent {...props} />;
  };
  return Guarded;
};

const GuardedCharactersStack = withOfflineGuard(CharactersStackNavigator);

const GuardedEpisodes: React.FC = () => {
  const isConnected = useNetworkStatus();
  if (!isConnected) return <InternetLostScreen />;
  return (
    <Suspense fallback={<ScreenLoader />}>
      <EpisodesScreen />
    </Suspense>
  );
};

const GuardedLocations: React.FC = () => {
  const isConnected = useNetworkStatus();
  if (!isConnected) return <InternetLostScreen />;
  return (
    <Suspense fallback={<ScreenLoader />}>
      <LocationsScreen />
    </Suspense>
  );
};

const GuardedFavourites: React.FC = () => {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <FavouritesScreen />
    </Suspense>
  );
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICONS: Record<string, string> = {
  Characters: 'alien',
  Episodes: 'television-play',
  Locations: 'map-marker-multiple',
  Favourites: 'heart',
};

const AppNavigator: React.FC = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: Colors.tabBarActive,
          tabBarInactiveTintColor: Colors.tabBarInactive,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={TAB_ICONS[route.name] ?? 'circle'}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen name="Characters" component={GuardedCharactersStack} />
        <Tab.Screen name="Episodes" component={GuardedEpisodes} />
        <Tab.Screen name="Locations" component={GuardedLocations} />
        <Tab.Screen name="Favourites" component={GuardedFavourites} />
      </Tab.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    color: Colors.textPrimary,
    fontSize: 8,
    marginTop: Spacing.sm,
  },
  tabBar: {
    backgroundColor: Colors.tabBarBg,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: TAB_BAR_HEIGHT,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightMedium,
  },
});

export default AppNavigator;
