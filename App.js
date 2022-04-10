//npm import
import React, {useEffect, useState} from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

//custom components import
import Login from "./components/Login";
import Main from "./components/Main";
import { storeScheme } from "./methods/App/storeScheme";
import { getScheme } from "./methods/App/getScheme";

const Stack = createNativeStackNavigator();

export default function App() {
    const scheme = useColorScheme()
    useEffect(async () => {
        await storeScheme(scheme)
    });
    return (
        <AppearanceProvider>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppearanceProvider>
  );
}