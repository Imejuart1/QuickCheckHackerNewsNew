import { StatusBar } from 'expo-status-bar';
import { StyleSheet, useColorScheme  } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { initDB } from './utils/database';

export default function App() {
  const colorScheme = useColorScheme();
    useEffect(() => {
      initDB(); // Ensure the database is initialized when the app starts
    }, []);
  
  return (
       <Provider store={store}>
       <PaperProvider theme={colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme}>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

import 'react-native-gesture-handler'; // Ensure this is at the top
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}*/
