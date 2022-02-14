//npm import
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom component import
import MainPage from "./MainPage";
import Search from "./Search";

const Tab = (Platform.OS === 'ios') ? createBottomTabNavigator() : createMaterialTopTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator initialRouteName="MainPage" screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: 'ghostwhite'}}}>
            <Tab.Screen name="MainPage" component={MainPage}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarActiveTintColor: "#555555",
                            tabBarActiveBackgroundColor: '#F0F0FF',
                            tabBarIcon: () => (
                                <Icon name="home" color={'black'} size={26} />
                            ),
                        }}
            />
            <Tab.Screen name="Search" component={Search}
                        options={{
                            tabBarLabel: 'Search',
                            tabBarActiveTintColor: "#555555",
                            tabBarActiveBackgroundColor: '#F0F0FF',
                            tabBarIcon: () => (
                                <Icon name="search" color={'black'} size={26} />
                            ),
                        }}
            />
        </Tab.Navigator>
    );
}