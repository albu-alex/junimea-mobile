//npm imports
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//css stylesheet import
import { styles } from "../styles/LoginStyles";

//custom components import
import { verifyLogin } from "../methods/Login/verifyLogin";
import { loginAsGuest } from "../methods/Login/loginAsGuest";

export default function Login({ navigation }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
                                       placeholderTextColor={'#070000'} onChangeText={newUsername => setUsername(newUsername)} defaultValue={username} />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Icon style={styles.inputIcon} name="lock" size={28} color={"#070700"} />
                            <TextInput autoCorrect={false} secureTextEntry={true} style={styles.textInput} placeholder={"Password"} placeholderTextColor={'#070000'}
                                       onChangeText={newPassword => setPassword(newPassword)} defaultValue={password}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => verifyLogin(username, password)} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => loginAsGuest(navigation)} style={styles.loginButton}>
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