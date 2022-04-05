//npm imports
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Image,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//css stylesheet import
import { styles } from "../styles/LoginStyles";

//custom methods import
import { verifyLogin } from "../methods/Login/verifyLogin";
import { loginAsGuest } from "../methods/Login/loginAsGuest";
import { verifyRegister } from "../methods/Login/verifyRegister";
import { getScheme } from "../methods/App/getScheme";

export default function Login({ navigation }){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [register, setRegister] = useState(false)
    const [scheme, setScheme] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
    const [textColor, setTextColor] = useState("")
    useEffect(async () => {
        setScheme(await getScheme())
        setBackgroundColor((scheme === 'dark') ? '#070700' : 'ghostwhite')
        setTextColor((scheme === 'dark') ? 'ghostwhite' : '#070700')
    });
    useEffect(async () => {
        navigation.navigate("Main")
    }, []);
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container,
                {backgroundColor: backgroundColor}]}>
                <StatusBar style="auto"/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.inner,
                        {backgroundColor: backgroundColor}]}>
                        <Text style={[styles.introText,
                            {color: textColor}]}>Welcome to juni.</Text>
                        {!register &&
                            <View style={{flexDirection: 'row'}}>
                                <Icon style={styles.inputIcon} name="user" size={28} color={"#070700"}/>
                                <TextInput autoCorrect={false} autoComplete={'email'} style={styles.textInput}
                                           placeholder={"Username or Email"}
                                           placeholderTextColor={'#070000'}
                                           onChangeText={newUsername => setUsername(newUsername)}
                                           defaultValue={username}/>
                            </View>
                        }
                        {register &&
                            <View style={{flexDirection: 'row'}}>
                                <Icon style={styles.inputIcon} name="envelope" size={20} color={"#070700"}/>
                                <TextInput autoCorrect={false} autoComplete={'email'} style={styles.textInput}
                                           placeholder={"Email"}
                                           placeholderTextColor={'#070000'}
                                           onChangeText={newEmail => setEmail(newEmail)}
                                           defaultValue={email}/>
                            </View>
                        }
                        {register &&
                            <View style={{flexDirection: 'row'}}>
                                <Icon style={styles.inputIcon} name="user" size={28} color={"#070700"}/>
                                <TextInput autoCorrect={false} style={styles.textInput}
                                           placeholder={"Username"}
                                           placeholderTextColor={'#070000'}
                                           onChangeText={newUsername => setUsername(newUsername)}
                                           defaultValue={username}/>
                            </View>
                        }
                        {!register &&
                            <View style={{flexDirection: 'row'}}>
                                <Icon style={styles.inputIcon} name="lock" size={28} color={"#070700"}/>
                                <TextInput autoCorrect={false} secureTextEntry={true} style={styles.textInput}
                                           placeholder={"Password"} placeholderTextColor={'#070000'}
                                           onChangeText={newPassword => setPassword(newPassword)}
                                           defaultValue={password}/>
                            </View>
                        }
                        {register &&
                            <View style={{flexDirection: 'row'}}>
                                <Icon style={styles.inputIcon} name="lock" size={28} color={"#070700"}/>
                                <TextInput autoCorrect={false} secureTextEntry={true} style={styles.textInput}
                                           placeholder={"Password"} placeholderTextColor={'#070000'}
                                           onChangeText={newPassword => setPassword(newPassword)}
                                           defaultValue={password}/>
                            </View>
                        }
                        {!register &&
                            <TouchableOpacity activeOpacity={0.6} onPress={() => verifyLogin(username, password, navigation)}
                                              style={styles.loginButton}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        }
                        {!register &&
                            <TouchableOpacity activeOpacity={0.6} onPress={() => loginAsGuest(navigation)}
                                              style={styles.loginButton}>
                                <Text style={styles.buttonText}>Login as guest</Text>
                            </TouchableOpacity>
                        }
                        {!register &&
                            <Text style={styles.secondaryText}>Or you can register</Text>
                        }
                        {!register &&
                            <TouchableOpacity activeOpacity={0.6} onPress={() => setRegister(true)} style={styles.loginButton}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                        }
                        {register &&
                            <TouchableOpacity activeOpacity={0.6} onPress={() => verifyRegister(email ,username, password, navigation)} style={styles.loginButton}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                        }
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