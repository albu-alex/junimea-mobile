import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEDEDE'
    },
    inner: {
        paddingTop: '10%',
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'ghostwhite'
    },
    introText:{
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#070000',
        marginTop: '10%',
        marginBottom: '5%'
    },
    textInput:{
        backgroundColor: '#AFAFAF',
        width: '90%',
        height: 40,
        marginBottom: '5%',
        marginLeft: '-6%',
        color: "#070700",
        borderRadius: 15,
        paddingHorizontal: 25,
    },
    loginButton:{
        backgroundColor: '#AFAFAF',
        margin: '5%',
        width: '90%',
        borderRadius: 10
    },
    buttonText:{
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'normal',
        color: '#070700',
        marginTop: '1%',
        marginBottom: '1%'
    },
    secondaryText:{
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: "#555555",
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '5%'
    },
    logo:{
        width: Dimensions.get('window').width/2,
        height: Dimensions.get('window').width/2,
        alignSelf: 'center',
        marginTop: '10%'
    },
    inputIcon:{
        zIndex: 2,
        marginLeft: '6%',
        marginTop: '1%'
    }
});