//npm imports
import { Text, View, Image, TouchableOpacity, FlatList,
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
            <View>
                <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                       style={styles.profilePicture} />
                <Text style={styles.primaryText}>username</Text>
            </View>
            <View style={{flexDirection: 'row', borderBottomWidth: 0.6, borderBottomColor: '#070700'}}>
                <TouchableOpacity style={styles.profileButton}>
                    <Text style={styles.buttonText} onPress={() => alert("Change picture")}>Change picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton} onPress={() => alert("View saved posts")}>
                    <Text style={styles.buttonText}>View saved posts</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}