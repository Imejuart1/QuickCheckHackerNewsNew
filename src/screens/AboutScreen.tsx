import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

const AboutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    card: {
      width: '90%',
      padding: 15,
      backgroundColor: theme.dark 
        ? '#2a0d36' 
        : '#f3e5f5',
      borderRadius: 10,
      elevation: 3,
      marginTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme.dark ? '#ffffff' : '#000000',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 15,
      marginBottom: 5,
      color: theme.dark ? '#bb86fc' : '#6200ee',
    },
    text: {
      marginBottom: 10,
      color: theme.dark ? '#ffffff' : '#000000',
    },
    paragraph: {
      color: theme.dark ? '#bbbbbb' : '#555555',
    },
    logoutButton: {
      width: '90%',
      marginBottom: 30,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>About Me</Title>
          <Paragraph style={styles.text}>
            Hello! I'm Ikwuegbuenyi Augustus, a passionate software engineer.
          </Paragraph>
          <Paragraph style={styles.text}>
            I graduated from Federal University of Technology Akure (FUTA) and 
            I'm excited about the opportunity to work with QuickCheck.
          </Paragraph>
          
          <Title style={styles.subtitle}>Technical Skills</Title>
          <Paragraph style={styles.text}>
            This app demonstrates my skills with:
          </Paragraph>
          <Paragraph style={styles.paragraph}>- React Native Paper UI</Paragraph>
          <Paragraph style={styles.paragraph}>- Redux state management</Paragraph>
          <Paragraph style={styles.paragraph}>- SQLite local database</Paragraph>
          <Paragraph style={styles.paragraph}>- Navigation system</Paragraph>
          
          <Title style={styles.subtitle}>Hobbies & Interests</Title>
          <Paragraph style={styles.text}>
            When I'm not coding, I enjoy:
          </Paragraph>
          <Paragraph style={styles.paragraph}>- Watching football</Paragraph>
          <Paragraph style={styles.paragraph}>- Creating software solutions</Paragraph>
          <Paragraph style={styles.paragraph}>- Learning new technologies</Paragraph>
        </Card.Content>
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Button mode="contained" style={styles.button}>
          Logout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;