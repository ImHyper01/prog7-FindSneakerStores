import * as React from 'react';
import {useState, useEffect} from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './pages/HomeScreen';
import ListScreen from './pages/ListScreen';
import MapScreen from './pages/MapScreen';
import SettingScreen from './pages/SettingScreen';
import SavedScreen from './pages/SavedScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



//bottom tab navigator
function HomeStack(){
  return(
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false}}>
        <Stack.Screen 
        name="Home"
        component={HomeScreen}
        />
    </Stack.Navigator>
  );
}

//bottom tab navigator
function MapStack({ shoes }) {
  return (
    <Stack.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Map"
        component={MapScreen}
        initialParams={{ shoes }}
      />
      <Stack.Screen name="Saved" component={SavedScreen} />
    </Stack.Navigator>
  );
}


//bottom tab navigator
function ListStack({ shoes }) {
  return (
    <Stack.Navigator initialRouteName="List" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="List"
        component={ListScreen}
        initialParams={{ shoes }}
      />
    </Stack.Navigator>
  );
}

//bottom tab navigator
function settingStack(){
  return(
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false}}>
        <Stack.Screen 
        name="Settings"
        component={SettingScreen}
        />
    </Stack.Navigator>
  );
}


function App() {

const [loading, setLoading] = useState(true);
const [shoes, setShoes] = useState([]);


  return (
    
  <NavigationContainer> 
    <Tab.Navigator>

        <Tab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
          }} />
        
          <Tab.Screen
          name='MapStack'
          component={MapStack}
          options={{
            tabBarLabel: 'Map',
            title: 'Map',
          }} />

          <Tab.Screen 
          name='ListStack'
          component={ListStack}
          options={{
            tabBarLabel: 'List',
            title: 'List',
          }} />

          <Tab.Screen 
          name='settingStack'
          component={settingStack}
          options={{
            tabBarLabel: 'Setting',
            title: 'Setting',
          }}  />

          
    </Tab.Navigator>
  </NavigationContainer> 
  );
}

export default App;