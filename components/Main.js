//npm import
import React, { useState, useEffect } from 'react';
import { Platform, Image } from 'react-native';
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
import {getScheme} from "../methods/App/getScheme";

const Tab = (Platform.OS === 'ios') ? createBottomTabNavigator() : createMaterialTopTabNavigator();

export default function Main() {
    const [profilePicture, setProfilePicture] = useState('')
    const [iconColor, setIconColor] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')
    const [tabBarActiveTintColor, setTabBarActiveTintColor] = useState('')
    const [tabBarActiveBackgroundColor, setTabBarActiveBackgroundColor] = useState('')
    const [userIcon, setUserIcon] = useState(false)
    useEffect(async () => {
        let scheme = await getScheme()
        setIconColor((scheme === 'dark') ? 'white' : 'black')
        setBackgroundColor((scheme === 'dark') ? '#070700' : 'ghostwhite')
        setTabBarActiveTintColor((scheme === 'dark') ? "#AAAAAA" : "#555555")
        setTabBarActiveBackgroundColor((scheme === 'dark') ? "#0A0A00" : '#F0F0FF')
        const [newProfilePicture, _, __] = await getUserDetails();
        if (newProfilePicture !== profilePicture)
            setProfilePicture(newProfilePicture)
        setUserIcon((profilePicture !== ''))
    }, [])
    return (
        <Tab.Navigator initialRouteName="MainPage" screenOptions={{headerShown: false, tabBarStyle:
                { backgroundColor: backgroundColor,
                marginTop: (Platform.OS === 'android') ? 30 : 0 }}}>
            <Tab.Screen name="MainPage" component={MainPage}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarActiveTintColor: tabBarActiveTintColor,
                            tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
                            tabBarIcon: () => (
                                <Icon name="home" color={iconColor} size={26} />
                            ),
                        }}
            />
            <Tab.Screen name="Search" component={Search}
                        options={{
                            tabBarLabel: 'Search',
                            tabBarActiveTintColor: tabBarActiveTintColor,
                            tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
                            tabBarIcon: () => (
                                <Icon name="search" color={iconColor} size={26} />
                            ),
                        }}
            />
            <Tab.Screen name="UserProfile" component={UserProfile}
                        options={{
                            tabBarLabel: 'Profile',
                            tabBarActiveTintColor: tabBarActiveTintColor,
                            tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
                            tabBarIcon: () => (
                                (userIcon) ? <Image source={{uri: profilePicture}}
                                                    style={{width: 30, height: 30, borderRadius: 50}} />
                                            :
                                            <Icon name="user" color={iconColor} size={26} />
                            ),
                        }}
            />
            <Tab.Screen name="Settings" component={Settings}
                        options={{
                            tabBarLabel: 'Settings',
                            tabBarActiveTintColor: tabBarActiveTintColor,
                            tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
                            tabBarIcon: () => (
                                <Icon name="cog" color={iconColor} size={26} />
                            ),
                        }}
            />
        </Tab.Navigator>
    );
}