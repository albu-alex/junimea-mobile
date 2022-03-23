//npm import
import React, { useState, useEffect } from 'react';
import { useColorScheme } from "react-native-appearance";
import { Platform, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom method import
import { getUserDetails } from "../methods/UserProfile/getUserDetails";

//custom component import
import MainPage from "./MainPage";
import Search from "./Search";
import UserProfile from "./UserProfile"
import Settings from "./Settings"

const Tab = (Platform.OS === 'ios') ? createBottomTabNavigator() : createMaterialTopTabNavigator();
let userIcon = <Icon name="user" color={'black'} size={26} />

export default function Main() {
    const [profilePicture, setProfilePicture] = useState('')
    const scheme = useColorScheme()
    const iconColor = (scheme === 'dark') ? 'white' : 'black'
    useEffect(async () => {
        const [newProfilePicture, _, __] = await getUserDetails();
        if (newProfilePicture !== profilePicture)
            setProfilePicture(newProfilePicture)
        userIcon = (profilePicture !== '') ? <Image source={{uri: profilePicture}}
                                                    style={{width: 30, height: 30, borderRadius: 50}} />
                                            :
                                             <Icon name="user" color={iconColor} size={26} />
    })
    return (
        <Tab.Navigator initialRouteName="MainPage" screenOptions={{headerShown: false, tabBarStyle:
                { backgroundColor: (scheme === 'dark') ? '#070700' : 'ghostwhite',
                marginTop: (Platform.OS === 'android') ? 30 : 0 }}}>
            <Tab.Screen name="MainPage" component={MainPage}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarActiveTintColor: (scheme === 'dark') ? "#AAAAAA" : "#555555",
                            tabBarActiveBackgroundColor: (scheme === 'dark') ? "#0A0A00" : '#F0F0FF',
                            tabBarIcon: () => (
                                <Icon name="home" color={iconColor} size={26} />
                            ),
                        }}
            />
            <Tab.Screen name="Search" component={Search}
                        options={{
                            tabBarLabel: 'Search',
                            tabBarActiveTintColor: (scheme === 'dark') ? "#AAAAAA" : "#555555",
                            tabBarActiveBackgroundColor: (scheme === 'dark') ? "#0A0A00" : '#F0F0FF',
                            tabBarIcon: () => (
                                <Icon name="search" color={iconColor} size={26} />
                            ),
                        }}
            />
            <Tab.Screen name="UserProfile" component={UserProfile}
                        options={{
                            tabBarLabel: 'Profile',
                            tabBarActiveTintColor: (scheme === 'dark') ? "#AAAAAA" : "#555555",
                            tabBarActiveBackgroundColor: (scheme === 'dark') ? "#0A0A00" : '#F0F0FF',
                            tabBarIcon: () => (
                                userIcon
                            ),
                        }}
            />
            <Tab.Screen name="Settings" component={Settings}
                        options={{
                            tabBarLabel: 'Settings',
                            tabBarActiveTintColor: (scheme === 'dark') ? "#AAAAAA" : "#555555",
                            tabBarActiveBackgroundColor: (scheme === 'dark') ? "#0A0A00" : '#F0F0FF',
                            tabBarIcon: () => (
                                <Icon name="cog" color={iconColor} size={26} />
                            ),
                        }}
            />
        </Tab.Navigator>
    );
}