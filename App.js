import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './Views/LoginScreen';
import RegisterScreen from './Views/RegisterScreen';
import ForgotPasswordScreen from './Views/ForgotPasswordScreen';
import HomeScreen from './Views/HomeScreen';
import SearchGeoCache from './SearchGeoCache';
import FavScreen from './Fav';
import AddGeoCache from './Views/AddGeoCacheScreen';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen}/>
        <Stack.Screen name="Search Geo Cache" component={SearchGeoCache}/>
        <Stack.Screen name="Favorites" component={FavScreen}/>
        <Stack.Screen name="Add New Geo Cache" component={AddGeoCache}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
