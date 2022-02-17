//npm imports
import { Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//css stylesheet import
import {styles} from "../styles/UserProfileStyles"

export default function UserProfile({ navigation }){
    return(
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("MainPage")}>
                    <Icon name='arrow-left' size={30} color={"#505050"}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("report user")}>
                    <Icon name='ellipsis-h' size={30} color={'#505050'}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}