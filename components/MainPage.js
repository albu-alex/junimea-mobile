//npm import
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//css stylesheet import
import { styles } from "../styles/LoginStyles";


export default function MainPage({ navigation }){
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text>ce faci ba</Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}