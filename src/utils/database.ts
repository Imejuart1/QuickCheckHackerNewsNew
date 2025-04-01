import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

// Prevent crashes on Web
let db: SQLite.SQLiteDatabase | null = null;
if (Platform.OS !== 'web') {
  db = SQLite.openDatabaseSync('quickcheck.db'); // Use openDatabaseSync
} else {
  console.warn('SQLite is not available on the web. Consider using AsyncStorage.');
}

export const initDB = async () => {
  if (!db) return;
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        email TEXT UNIQUE, 
        password TEXT
      );
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

export const registerUser = async (email: string, password: string): Promise<boolean> => {
  if (!db) return false;
  try {
    // Check if the email already exists
    const existingUser = await db.getAllAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM users WHERE email = ?;',
      [email]
    );

    if (existingUser[0].count > 0) {
      console.log('Email already exists');
      return false; // Prevent duplicate registration
    }

    // Insert new user if email is unique
    const result = await db.runAsync(
      'INSERT INTO users (email, password) VALUES (?, ?);',
      [email, password]
    );
    return result.changes! > 0;
  } catch (error) {
    console.log('Registration error:', error);
    return false;
  }
};

export const loginUser = async (email: string, password: string): Promise<boolean> => {
  if (!db) return false;
  try {
    const result = await db.getAllAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM users WHERE email = ? AND password = ?;',
      [email, password]
    );
    return result.length > 0 && result[0].count > 0;
  } catch (error) {
    console.log('Login error:', error);
    return false;
  }
};
