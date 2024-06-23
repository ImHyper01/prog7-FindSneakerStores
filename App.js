import * as React from 'react';
import {useState, useEffect} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {  DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './theme/theme';
import themeContext from './theme/themeContext';


import HomeScreen from './pages/HomeScreen';
import ListScreen from './pages/ListScreen';
import MapScreen from './pages/MapScreen';
import SettingScreen from './pages/SettingScreen';
import SavedScreen from './pages/SavedScreen';
import { EventRegister } from 'react-native-event-listeners';

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
function SettingStack(){
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

const getShoes = async () => {
  try {
    const response = await fetch('https://stud.hosted.hr.nl/1027469/shoestores.json');
    const json = await response.json();
      setShoes(json.shoes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShoes();
  }, []);

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data)
    })
    return () => {
      EventRegister.removeAllListeners(listener)
    }

  }, [darkMode])

  return (
<themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>  
  <NavigationContainer theme={darkMode === true ? DarkTheme: DefaultTheme}> 
    <Tab.Navigator
    initialRouteName="Feed"
    screenOptions={({ route }) => ({
      headerStyle: { backgroundColor: '#0000e6' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
            //Via hier gaat de routes werken om naar de verschillende pagina's te kunnen gaan. ik wijzig hier ook de icons
            if(route.name === 'HomeStack') {
              iconName = focused
                ? 'home-circle'
                : 'home-circle-outline';
            }else if(route.name === 'MapStack') {
              iconName = focused
                ? 'map-marker'
                : 'map-marker-outline';
            }else if(route.name === 'ListStack') {
              iconName = focused
                ? 'format-list-bulleted'
                : 'format-list-bulleted';
            }else if (route.name === 'SettingStack') {
              iconName = focused
                ? 'cog'
                : 'cog-outline';
            }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
    >

        <Tab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
          }} />
        
          <Tab.Screen
          name='MapStack'
          component={() => <MapStack shoes={shoes} />}
          options={{
            tabBarLabel: 'Map',
            title: 'Map',
          }} />

          <Tab.Screen 
          name='ListStack'
          component={() => <ListStack shoes={shoes} />}
          options={{
            tabBarLabel: 'List',
            title: 'List',
          }} />

          <Tab.Screen 
          name='SettingStack'
          component={SettingStack}
          options={{
            tabBarLabel: 'Setting',
            title: 'Setting',
          }}  />

          
    </Tab.Navigator>
  </NavigationContainer> 
</themeContext.Provider>
  );
}

export default App;