// src/navigation/AppNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import NewsFeed from '../screens/NewsFeed';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ title: 'Login/Register' }} 
        />
        <Stack.Screen 
          name="NewsFeed" 
          component={NewsFeed} 
          options={{ title: 'Top Stories' }} 
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ title: 'About Me' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}