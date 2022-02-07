import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';


export default function Login(){
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
                <StatusBar style="auto"/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput placeholder={"Username"} />
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});