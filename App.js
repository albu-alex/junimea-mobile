//npm import
import React from 'react';
import { NavigationContainer, LightTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

//custom components import
import Login from "./components/Login";
import Main from "./components/Main";

const Stack = createNativeStackNavigator();

export default function App() {
    const scheme = useColorScheme()
    return (
        <AppearanceProvider>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppearanceProvider>
  );
}