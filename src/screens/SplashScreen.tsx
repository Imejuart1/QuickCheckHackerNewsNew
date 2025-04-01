import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing,TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  NewsFeed: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: Props) {
  const spinValue = new Animated.Value(0);
  const scaleValue = new Animated.Value(1);
  const fadeValue = new Animated.Value(0);

  // Spin animation for logo
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  // Pulse animation
  const pulse = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => pulse());
  };

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ]).start();

    pulse();

    const timer = setTimeout(() => {
      navigation.navigate('Auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableOpacity 
      activeOpacity={1}
      onPress={() => navigation.navigate('Auth')}
      style={styles.touchableContainer}
    >
      <LinearGradient
        colors={['#6200ee', '#3700b3', '#000000']}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <Animated.View style={{ opacity: fadeValue }}>
        <Animated.View style={{ transform: [{ rotate: spin }, { scale: scaleValue }] }}>
          <Ionicons name="newspaper" size={80} color="white" />
        </Animated.View>
      </Animated.View>

      <Animated.Text style={[styles.text, { opacity: fadeValue }]}>
        QuickCheck
      </Animated.Text>
      <Animated.Text style={[styles.subText, { opacity: fadeValue }]}>
        Hacker News Reader
      </Animated.Text>

      <Animated.View style={[styles.loadingContainer, { opacity: fadeValue }]}>
        <View style={styles.loadingDot} />
        <View style={[styles.loadingDot, { marginHorizontal: 10 }]} />
        <View style={styles.loadingDot} />
      </Animated.View>
    </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginTop: 5,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});