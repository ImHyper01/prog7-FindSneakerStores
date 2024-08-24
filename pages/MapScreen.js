import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity, StyleSheet, View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import themeContext from '../theme/themeContext';

const MapScreen = ({ route, navigation }) => {
  const [shoes, setShoes] = useState([]);
  const [selectedShoe, setSelectedShoe] = useState(null);

  // hier fetch ik de date van de context
  const theme = useContext(themeContext);

    //hier fetch ik de winkels van de route parameters en zet ik zi in een useState
  useEffect(() => {
    if (route.params && route.params.shoes) {
      setShoes(route.params.shoes);
    }
  }, [route.params]);

  //handle de klik op een winkel en navigeer het op de map
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
    })();
  }, []);

  useEffect(() => {
    //fetch de gekozen winkel van de route parameter en zet het in een state
    if (route.params && route.params.selectedShoe) {
      setSelectedShoe(route.params.selectedShoe);
    }
  }, [route.params]);

  useEffect(() => {
    //wanner de winkel gekozen wordt, focus het op de gekozen winkel
    if (selectedShoe) {
      //vanuit gaan dat winkel object een latitude en longitude heeft.
      const { latitude, longitude } = selectedShoe;
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [selectedShoe]);

  //handle om naar je current locatie te gaan
  const goToCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    };

  // create een refrence naar de map
  const mapRef = React.useRef(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.view}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <MapView
            style={styles.map}
            ref={mapRef}
            initialRegion={{
              latitude: 51.91972,
              longitude: 4.47778,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            showsUserLocation={true}
          >
            {shoes && shoes.length > 0 && shoes.map((shoe, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: shoe.latitude,
                  longitude: shoe.longitude,
                }}
                title={shoe.title}
                description={shoe.description}
                onPress={() => setSelectedShoe(shoe)}
              />
            ))}
          </MapView>

          <TouchableOpacity style={[styles.heartButton, { backgroundColor: theme.color }]} onPress={() => navigation.navigate('Saved')}>
            <Icon name='heart' size={30} color="red" />
          </TouchableOpacity>

          {/* button naar de current location */}
          <TouchableOpacity style={styles.locationButton} onPress={goToCurrentLocation}>
            <Icon name='crosshairs-gps' size={30} color="white" />
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
  },
  locationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
  },
});

export default MapScreen;
