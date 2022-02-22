//npm import
import { Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={() => alert("logout")}>
                            <Icon style={{marginTop: 4}} name='sign-out' size={24} color={"#555555"}></Icon>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => alert("logout")}>
                            <Icon style={{marginTop: 4}} name='moon-o' size={24} color={"#555555"}></Icon>
                            <Text style={styles.buttonText}>Dark mode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => alert("logout")}>
                            <Icon style={{marginTop: 4}} name='user' size={24} color={"#555555"}></Icon>
                            <Text style={styles.buttonText}>Update profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => alert("logout")}>
                            <Icon style={{marginTop: 4}} name='close' size={24} color={"#555555"}></Icon>
                            <Text style={styles.buttonText}>Close settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}