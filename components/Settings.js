//npm import
import { Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';

//css stylesheet import
import { styles } from "../styles/SettingsStyles";

export default function Settings({navigation}){
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}