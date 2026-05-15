/**
 * @fileoverview Custom redux-persist storage backed by react-native-sqlite-2.
 */

import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase(
  'rickmorty.db',
  '1.0',
  'RickMorty Database',
  200000,
);

db.transaction(tx => {
  tx.executeSql(`
    CREATE TABLE IF NOT EXISTS redux_persist_kv (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);
});

export const SQLiteStorage = {
  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT value FROM redux_persist_kv WHERE key = ?;',
          [key],
          (_, results) => {
            if (results.rows.length > 0) {
              const row = results.rows.item(0) as {value: string};
              resolve(row.value);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  },

  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT OR REPLACE INTO redux_persist_kv (key, value) VALUES (?, ?);',
          [key, value],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  },

  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM redux_persist_kv WHERE key = ?;',
          [key],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  },
};