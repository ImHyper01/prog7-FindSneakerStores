import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from "../theme/themeContext";

const SavedScreen = () => {
    const [savedShoes, setSavedShoes] = useState([]);

    const theme = useContext(themeContext);

    useEffect(() => {
        getSavedShoes();
    }, []);

    const getSavedShoes = async () => {
        try {
            const savedShoesJson = await AsyncStorage.getItem('savedShoes');
            if (savedShoesJson !== null) {
                setSavedShoes(JSON.parse(savedShoesJson));
            }
        } catch (error){
            console.error('error retriving saving shoes', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1}}>
            <View style={{ flex: 1, padding: 16}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.header, {color: theme.color }]}>
                        je favorites
                    </Text>

                    {savedShoes.length > 0 ? (
                        savedShoes.map((shoe, index) => (
                            <View key={index} style={{marginBottom: 10}} >
                                <Text style={[styles.textItem, { color: theme.color }]}>{shoe}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>Er zijn geen favoriete winkels gevonden</Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        alignItems: 'center',
        marginBottom: 16,
    },
    textItem: {
        fontSize: 26,
        textAlign: "center",
    },
});

export default SavedScreen;
