//npm import
import { Text, View, TouchableOpacity, ScrollView,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';

//css stylesheet import
import { styles } from "../styles/SearchStyles";


export default function Search({ navigation }){
    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text>Search!</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}