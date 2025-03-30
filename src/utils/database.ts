// src/utils/database.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quickcheck.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT);'
    );
  });
};

export const registerUser = (email: string, password: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (email, password) VALUES (?, ?);',
        [email, password],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => {
          console.log('Registration error:', error);
          reject(false);
        }
      );
    });
  });
};

export const loginUser = (email: string, password: string): Promise<boolean> => {
  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?;',
        [email, password],
        (_, result) => resolve(result.rows.length > 0),
        (_, error) => {
          console.log('Login error:', error);
          resolve(false);
        }
      );
    });
  });
};