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

  const theme = useContext(themeContext);

  useEffect(() => {
    if (route.params && route.params.shoes) {
      setShoes(route.params.shoes);
    }
  }, [route.params]);

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
    if (route.params && route.params.selectedShoe) {
      setSelectedShoe(route.params.selectedShoe);
    }
  }, [route.params]);

  useEffect(() => {
    if (selectedShoe) {
      const { latitude, longitude } = selectedShoe;
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [selectedShoe]);

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
});

export default MapScreen;
