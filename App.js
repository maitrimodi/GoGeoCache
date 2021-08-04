import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './Views/LoginScreen';
import RegisterScreen from './Views/RegisterScreen';
import HomeScreen from './Views/HomeScreen';
import ListGeoCacheScreen from './Views/ListGeoCacheScreen';
import AddGeoCache from './Views/AddGeoCacheScreen';
import {setUser} from './Services/AsyncStorageService';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="List Geo Cache" component={ListGeoCacheScreen}/>
        <Stack.Screen name="Add New Geo Cache" component={AddGeoCache}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}


          // options={{
          //   headerTitle: 'Seguro',
          //   headerRight: () => { 
          //     return (
          //       <Button             
          //           onPress={() => console.log('This is a button!')}
          //           title="Logout"
          //           color="#00F"
          //       />
          //   )
          // }
          // }}
          options={({navigation}) => ({ headerRight: () => (
            <Button title="SignOut" color="#000" onPress={() => {
              setUser("");
              navigation.replace("Login");
            }}/>
          )})}
          // options={({navigation}) => ({ headerRight: () => (
          // <Button title="SignOut" color="#000" onPress={() => navigation.replace("Login")}/>
          // )})}
        />
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
