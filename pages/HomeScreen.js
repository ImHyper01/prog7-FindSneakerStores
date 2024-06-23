import * as React from 'react';
import { useContext } from 'react';
import themeContext from '../theme/themeContext';
import {View, 
        Text, 
        TouchableOpacity, 
        StyleSheet, 
        SafeAreaView 
    } from "react-native";


const HomeScreen = ({ navigation }) => {
    
    const theme = useContext(themeContext);

            return(
                <SafeAreaView style={{ flex: 1}}> 
                    <View style={{ flex:1, padding: 16}}>
                        <View style={{
                            flex:1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text 
                        style={{
                            fontSize: 25,
                            textAlign: 'center',
                            marginBottom: 16
                        }}>
                        <Text style={[styles.home, { color: theme.color }]}>Welkom op de home pagina</Text>
                        </Text>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={
                    () => navigation.navigate(
                        'MapStack', { screen: 'Maps' }
                    )}>
                    <Text>Ga naar de map pagina</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={
                    () => navigation.navigate(
                        'ListStack', { screen: 'List' }
                    )}>
                    <Text>Ga naar de lijst van winkels</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={
                    () => navigation.navigate(
                        'SettingsStack', { screen: 'Settings' }
                    )}>
                    <Text>Ga naar de setting pagina</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
      },
      home: {
    
      },
    });

export default HomeScreen;