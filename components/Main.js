//npm import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';

//custom component import
import MainPage from "./MainPage";

const Tab = (Platform.OS === 'ios') ? createBottomTabNavigator() : createMaterialTopTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator initialRouteName="MainPage">
            <Tab.Screen name="MainPage" component={MainPage} />
        </Tab.Navigator>
    );
}