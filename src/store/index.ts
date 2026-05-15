/**
 * @fileoverview Redux store configuration.
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { SQLiteStorage } from './sqliteStorage';
import favouritesReducer from './slices/favouritesSlice';
import uiReducer from './slices/uiSlice';

const favouritesPersistConfig = {
  key: 'favourites',
  storage: SQLiteStorage,
  version: 1,
};

const rootReducer = combineReducers({
  favourites: persistReducer(favouritesPersistConfig, favouritesReducer),
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
