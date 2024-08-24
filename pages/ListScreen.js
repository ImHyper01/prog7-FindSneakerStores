import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import themeContext from '../theme/themeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = ({ route, navigation }) => {
  const [shoes, setShoes] = useState([]);
  const [savedShoes, setSavedShoes] = useState([]);

  const theme = useContext(themeContext);

  //hier fetch ik de winkels van de route parameters en zet ik ze in een useState
  useEffect(() => {
    if (route.params && route.params.shoes) {
      setShoes(route.params.shoes);
    }
    getSavedShoes();
  }, [route.params]);

  //fetch ik de saved Schoenen van een json file
  const getSavedShoes = async () => {
    try {
      const savedShoesJson = await AsyncStorage.getItem('savedShoes');
      if (savedShoesJson !== null) {
        setSavedShoes(JSON.parse(savedShoesJson));
      }
    } catch (error) {
      console.error('Error retrieving saved shoes:', error);
    }
  };

  const handleSaveShoe = async (shoeTitle) => {
    try {
      const index = savedShoes.indexOf(shoeTitle);
      if (index === -1) {
        //winkel is niet opgeslagen, wordt toegevoegd aan winkel lijst
        const updatedSavedShoes = [...savedShoes, shoeTitle];
        setSavedShoes(updatedSavedShoes);
        await AsyncStorage.setItem('savedShoes', JSON.stringify(updatedSavedShoes));
        alert('Shoe saved successfully!');
      } else {
        //winkel is al toegevoegd, wordt hier verwijderd van de lijst
        const updatedSavedShoes = savedShoes.filter((savedShoe) => savedShoe !== shoeTitle);
        setSavedShoes(updatedSavedShoes);
        await AsyncStorage.setItem('savedShoes', JSON.stringify(updatedSavedShoes));
        alert('Shoe removed from favorites!');
      }
    } catch (error) {
      console.error('Error saving shoe:', error);
    }
  };

  //een check als het toegevoegd is
  const isShoeSaved = (shoeTitle) => {
    return savedShoes.includes(shoeTitle);
  };

  //handle de klik die de winkel laat zien op de map
  const handleShoeItemClick = (shoe) => {
    navigation.navigate('Map', { selectedShoe: shoe, shoes: shoes });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {shoes.map((shoe, index) => (
            <View style={styles.shoeItem} key={index}>
              <TouchableOpacity
                style={styles.shoeContent}
                onPress={() => handleShoeItemClick(shoe)}
              >
                
                <Icon name="store" size={30} color={theme.color} /> 
                <Text style={[styles.textItem, { color: theme.color }]}>{shoe.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSaveShoe(shoe.title)}
                style={styles.itemHeartButton}
              >
                <Icon
                  name={isShoeSaved(shoe.title) ? 'heart' : 'heart-outline'}
                  size={30}
                  color={isShoeSaved(shoe.title) ? 'red' : theme.color}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[styles.heartButton, { backgroundColor: theme.color }]}
        onPress={() => navigation.navigate('Saved')}
      >
        <Icon name="heart" size={30} color="red" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
  const styles = StyleSheet.create({
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    shoeItem: {
      width: '48%', 
      marginBottom: 16,
      borderRadius: 8,
      backgroundColor: "#eb9e34",
      padding: 16,
      flexDirection: 'column',
      alignItems: 'center', 
    },
    shoeContent: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 8,
    },
    textItem: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 8,
    },
    itemHeartButton: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
    heartButton: {
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

export default ListScreen;
