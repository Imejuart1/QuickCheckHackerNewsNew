import { StatusBar } from 'expo-status-bar';
import { Appearance, StyleSheet, useColorScheme  } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { initDB } from './utils/database';

export default function App() {
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      console.log('System color scheme changed to:', colorScheme);
    });
    return () => subscription.remove();
  }, []);
  
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}
