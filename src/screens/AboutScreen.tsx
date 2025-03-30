// src/screens/AboutScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>About Me</Title>
          <Paragraph>
            This app was created by [Your Name] as a React Native demo for QuickCheck.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            It uses Hacker News API to fetch top stories and implements:
          </Paragraph>
          <Paragraph>- React Native Paper UI</Paragraph>
          <Paragraph>- Redux state management</Paragraph>
          <Paragraph>- SQLite local database</Paragraph>
          <Paragraph>- Navigation system</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    margin: 10,
  },
  paragraph: {
    marginTop: 10,
  },
});

export default AboutScreen;