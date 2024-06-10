import * as React from 'react'
import { useState, useEffect, useContext} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import themeContext from '../theme/themeContext';



const MapScreen = () => {

    //hier roep ik de dark modus aan via de theme
    //Hier maak ik variables om dadelijk de data te kunnen fetchen
    const theme = useContext(themeContext);
    const [data, setData] = useState([]);
  
      //hier fetch ik data uit de json file die op de stud hosted staat
    const fetchMarkers = async () => {
      try {
        const response = await fetch('https://stud.hosted.hr.nl/1027469/map.json');
        const json = await response.json();
        setData(json.index);
      } catch (error) {
        console.error(error);
    } finally {
      setLoading(false)
    }
  };
  
  //Hier haal ik de functie op, om zo de data te kunnen gebruiken
  useEffect(() => {
    fetchMarkers();
  }, []);
  
  //Hier vraag ik als ik toestemming mag, om je locatie te mogen weten
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
  
      setPin({
        latitude: location.coords.latitude,
        longitude: location.longitude,
      });
    })();
  }, []);
  
  return (
<View style={[styles.container]}> 
    <MapView style={styles.map} region={{
      latitude: 51.91972,
              longitude: 4.47778,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
          onUserLocationChange={(e) => {
            e.nativeEvent
          }}
          > 
          {data.map((item) => 
      <Marker 
      //hier fetch ik de data uit de json file om zo de markers op de map te kunnen zetten.
          coordinate={{
            latitude: item.latitude,
             longitude: item.longitude,
              latitudeDelta: 0.01,
               longitudeDelta:0.01}}
               title={item.title}
               description= {item.description}>
               </Marker>)}
      </MapView>
      <Text> Welkom op de map, zie hier boven alle sneakers stores </Text>
    </View>
    );
  };
  
  //stylechanges
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },

    text: {
      fontSize: 25,
      textAlign: 'center',
      marginBottom: -125
    },
    marker: {
      height: 50,
      width: 21.50,
    },
   });

export default MapScreen;