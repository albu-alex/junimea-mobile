//npm import
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom component import
import MainPage from "./MainPage";

const Tab = (Platform.OS === 'ios') ? createBottomTabNavigator() : createMaterialTopTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator initialRouteName="MainPage" screenOptions={{headerShown: false}}>
            <Tab.Screen name="MainPage" component={MainPage}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarActiveTintColor: "#555555",
                            tabBarActiveBackgroundColor: '#F4F4FF',
                            tabBarStyle: {backgroundColor: 'ghostwhite'},
                            tabBarIcon: () => (
                                <Icon name="home" color={'black'} size={26} />
                            ),
                        }}
            />
        </Tab.Navigator>
    );
}