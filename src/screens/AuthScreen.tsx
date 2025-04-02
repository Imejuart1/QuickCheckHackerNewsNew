import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { loginUser, registerUser } from '../utils/database';
import { useTheme } from 'react-native-paper';

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: {
    screen: keyof MainTabParamList;
    params?: any;
  };
};
export type MainTabParamList = {
  NewsFeed: undefined;
  About: undefined;
};
export default function AuthScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Auth'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();
  console.log('Current theme:', {
    dark: theme.dark,
    colors: {
      background: theme.colors.background,
      surface: theme.colors.surface,
      onBackground: theme.colors.onBackground
    }
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 24,
      color: theme.colors.onBackground,
    },
    input: {
      marginBottom: 15,
      backgroundColor: theme.colors.surface,
    },
    button: {
      marginTop: 10,
      padding: 5,
    },
    toggleButton: {
      marginTop: 15,
      color: theme.colors.primary,
    },
  });

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
  
    try {
      const success = isLogin
        ? await loginUser(email, password)
        : await registerUser(email, password);
  
      if (success) {
        if (isLogin) {
          console.log('✅ Login successful. Navigating to NewsFeed...');
          navigation.navigate('Main', { screen: 'NewsFeed' });
        } else {
          console.log('✅ Registration successful. Navigating to Login...');
          Alert.alert('Success', 'Registration successful! Please log in.');
          setIsLogin(true); // Switch to login mode after registration
        }
      } else {
        Alert.alert('Error', isLogin 
          ? 'Invalid credentials' 
          : 'Registration failed (email may exist)');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    }
  };
  

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        {isLogin ? 'Login' : 'Register'}
      </Title>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      
      <Button 
        mode="contained" 
        onPress={handleAuth}
        style={styles.button}
      >
        {isLogin ? 'Login' : 'Register'}
      </Button>
      
      <Button 
        onPress={() => setIsLogin(!isLogin)}
        style={styles.toggleButton}
      >
        {isLogin 
          ? 'Need an account? Register' 
          : 'Have an account? Login'}
      </Button>
    </View>
  );
};

