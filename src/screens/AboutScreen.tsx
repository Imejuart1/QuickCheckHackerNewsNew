import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

const AboutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

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
          <Paragraph>- React Native Paper UI</Paragraph>
          <Paragraph>- Redux state management</Paragraph>
          <Paragraph>- SQLite local database</Paragraph>
          <Paragraph>- Navigation system</Paragraph>
          
          <Title style={styles.subtitle}>Hobbies & Interests</Title>
          <Paragraph style={styles.text}>
            When I'm not coding, I enjoy:
          </Paragraph>
          <Paragraph>- Watching football</Paragraph>
          <Paragraph>- Creating software solutions</Paragraph>
          <Paragraph>- Learning new technologies</Paragraph>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6200ee',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#3700b3',
  },
  text: {
    marginBottom: 10,
  },
  logoutButton: {
    width: '90%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 5,
  },
});

export default AboutScreen;