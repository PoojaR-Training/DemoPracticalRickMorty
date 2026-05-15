/**
 * @fileoverview App.tsx - root component. Sets up Redux, react-query, and persist gate.
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from './src/theme';
import SplashLoader from './src/components/SplashLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 2,
    },
  },
});

const PersistLoader: React.FC = () => <SplashLoader />;

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoader />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.background}
            translucent={false}
          />
          <AppNavigator />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
