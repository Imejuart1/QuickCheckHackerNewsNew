// src/screens/AuthScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import { loginUser, registerUser } from '../utils/database';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

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
        navigation.navigate('NewsFeed');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
  toggleButton: {
    marginTop: 15,
  },
});

export default AuthScreen;