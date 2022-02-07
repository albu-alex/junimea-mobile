import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from "../styles/LoginStyles"

export default function Login(){
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
                <StatusBar style="auto"/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.introText}>Welcome to juni.</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Icon style={styles.inputIcon} name="user" size={28} color={"#070700"} />
                            <TextInput autoCorrect={false} autoComplete={'email'} style={styles.textInput} placeholder={"Username or Email"}
                                       placeholderTextColor={'#070000'} />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Icon style={styles.inputIcon} name="lock" size={28} color={"#070700"} />
                            <TextInput autoCorrect={false} secureTextEntry={true} style={styles.textInput} placeholder={"Password"} placeholderTextColor={'#070000'} />
                        </View>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => null} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => null} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Login as guest</Text>
                        </TouchableOpacity>
                        <Text style={styles.secondaryText}>Or you can register</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => null} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                        <Image source={require('../assets/unicorn-negru-fara-scris.png')}
                                style={styles.logo} />
                        <TouchableOpacity activeOpacity={0.5} onPress={() => null}>
                            <Text style={styles.secondaryText}>Found any bugs? Report them!</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}