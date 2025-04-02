import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import NewsFeed from '../screens/NewsFeed';
import AboutScreen from '../screens/AboutScreen';
import { useTheme } from 'react-native-paper';
import { getNavigationTheme } from './themeUtils';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create your tab navigator component
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'NewsFeed') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }

          return <Ionicons 
  name={iconName as 'newspaper' | 'newspaper-outline' | 'information-circle' | 'information-circle-outline'} 
  size={size} 
  color={color} 
/>;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="NewsFeed" 
        component={NewsFeed} 
        options={{ title: 'Top Stories' }} 
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ title: 'About Me' }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const paperTheme = useTheme();
  const navigationTheme = getNavigationTheme(paperTheme);
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: paperTheme.colors.elevation.level2,
        },
        headerTintColor: paperTheme.colors.onSurface,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: {
          backgroundColor: paperTheme.colors.background,
        },}}
      initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ title: 'Login/Register', headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}