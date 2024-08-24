import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, Switch, TouchableOpacity, State } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../theme/themeContext';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {

  //Hier roep ik de variable useContext aan om de gegevens door te geven aan de functie
  //Hier maak ik variables om dadelijk de data te kunnen fetchen
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('nederlands');

  useEffect(() => {
    const loadDarkMode = async() => {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
        EventRegister.emit('ChangeTheme', JSON.parse(savedDarkMode));
      }
    };

    loadDarkMode();
  }, []);

  const toggleDarkMode = async (value) => {
    setDarkMode(value);
    EventRegister.emit('ChangeTheme', value);
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
  };
 
  //toggle language, helaas veranderd de applicatie niet van taal. puur erin gelaten omdat ik de settings page beetje leeg vond.
  const toggleLanguage = () => {
    const newLanguage = language === 'nederlands' ? 'engels' : 'nederlands';
    setLanguage(newLanguage);
  };

  return (
    //Hier kun je switchen tussen light en dark modus door een eventRegister. ik gebruik een swicth om tussen de twee values te kunnen switchen.
    //Bij de tweede doe ik switchen tussen de languages, hij werkt niet maar je kan switchen tussen nederlands of engels
    <SafeAreaView style={styles.container}>
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: theme.color }]}>Donkere modus</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
        />
      </View>
      
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: theme.color }]}>Taal</Text>
        <TouchableOpacity onPress={toggleLanguage}>
          <Text style={[styles.languageText, { color: theme.color }]}>{language}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
//stylechanges
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  languageText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default SettingScreen;