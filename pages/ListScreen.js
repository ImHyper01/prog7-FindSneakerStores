import * as React from 'react'
import { useState, useEffect, useContext} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import themeContext from '../theme/themeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage  from '@react-native-async-storage/async-storage';



const ListScreen = ({ route, navigation }) => {
    const [shoes, setShoes] = useState([]);
    const [savedShoes, setSavedShoes] = useState([]);

    const theme = useContext(themeContext);

    useEffect(() => {
        setShoes(route.params.shoes);
        getSavedShoes();
    }, []);

    const getSavedShoes = async() => {
        try {
            const savedShoesJson = await AsyncStorage.getItem('savedShoes');
            if (savedShoesJson !== null) {
                setSavedShoes(JSON.parse(savedShoesJson));
            }
        } catch (error) {
            console.error('error retrieving saved shoes:', error);
        }

        };

        const handleSaveShoe = async (shoeTitle) => {
            try{
                const index = savedShoes.indexOf(shoeTitle);
                if (index === -1) {
                    const updatedSavedShoes = [...savedShoes, shoeTitle];
                    setSavedShoes(updatedSavedShoes);

                    await AsyncStorage.setItem('savedShoes', JSON.stringify(updatedSavedShoes));
                    alert('Shoe saves Succesfully!');
                } else {
                    const updatedSavedShoes = savedShoes.filter((savedShoe) => savedShoe !== shoeTitle);

                    await AsyncStorage.setItem('savedShoes', JSON.stringify(updatedSavedShoes));
                    alert('Shoe removed from favorites!');
                }
            } catch (error) {
                console.error('error saving shoe:' , error);
            }
        };

        const isShoeSaved = (shoeTitle) => {
            return savedShoes.includes(shoeTitle);
        };

        const handleShoeItemClick = (shoe) => {
            navigation.navigate('Map', { selectedShoe: shoe});
        };

        return (
            <SafeAreaView style={{ flex: 1}}>
                <View style={{ flex: 1, padding: 16}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                        <ScrollView style={styles.ScrollView}>
                            {shoes.map((shoe, index) => (
                                <View style={styles.listView}>

                                    <TouchableOpacity
                                    key={index}
                                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                                    onPress={() => handleShoeItemClick(shoes)}
                                    
                                    >

                                        <Text style={[styles.textItem, {color: theme.color }]}>{shoe.title}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleSaveShoe(shoe.title)}
                                        style={[styles.itemHeartButton, { color: theme.color }]}
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
                        
                        <TouchableOpacity style={[styles.heartButton, { backgroundColor: theme.color }]} onPress={() => navigation.navigate('Saved')}>
                            <Icon name='heart' size={30} color='red' />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
        );
};

const styles= StyleSheet.create({
    ScrollView: {
        marginTop: 60,
        width: '100%',
    },

    listView: {
        flex: 1,
        flexDirection: 'column',
    },
    shoeItem: {
        flex: 1,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
     itemHeartButton: {
        flex: 1,
     },

     textItem: {
        flex: 1,
        fontSize: 20,
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

export default ListScreen;
        