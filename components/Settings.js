//npm import
import { Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList, Modal,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom method import
import { updateProfile } from "../methods/Settings/updateProfile"

//css stylesheet import
import { styles } from "../styles/SettingsStyles";

export default function Settings({navigation}){
    const [showModal, setShowModal] = useState(false)
    const submitUpdateProfile = async () =>{
        await updateProfile("a", "b", "c")
        setShowModal(false)
    }
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                            <Icon style={styles.icon} name='sign-out' size={24} color={"#555555"}></Icon>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => alert("change theme")}>
                            <Icon style={styles.icon} name='moon-o' size={24} color={"#555555"}></Icon>
                            <Text style={styles.buttonText}>Dark mode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
                            <Icon style={styles.icon} name='user' size={24} color={"#555555"}></Icon>
                            <Text style={styles.buttonText}>Update profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MainPage")}>
                            <Icon style={styles.icon} name='close' size={24} color={"#555555"}></Icon>
                            <Text style={styles.buttonText}>Close settings</Text>
                        </TouchableOpacity>
                        {showModal &&
                            <Modal animationType={'slide'} transparent={false}>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                    style={styles.container}>
                                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                        <View style={styles.container}>
                                            <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowModal(false)}>
                                                <Icon name="close" color="black" size={30}/>
                                            </TouchableOpacity>
                                            <View style={styles.inputsContainer}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Icon name="id-card-o" size={16} color={"#070700"} style={styles.modalIcon} />
                                                    <TextInput style={styles.textInput} placeholderTextColor={"#070700"} placeholder={'First Name'} />
                                                </View>
                                            </View>
                                            <View style={styles.inputsContainer}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Icon name="id-card-o" size={16} color={"#070700"} style={styles.modalIcon} />
                                                    <TextInput style={styles.textInput} placeholderTextColor={"#070700"} placeholder={'Last Name'} />
                                                </View>
                                            </View>
                                            <View style={styles.inputsContainer}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Icon name="envelope" size={16} color={"#070700"} style={styles.modalIcon} />
                                                    <TextInput style={styles.textInput} placeholderTextColor={"#070700"} placeholder={'Email'} />
                                                </View>
                                            </View>
                                            <TouchableOpacity style={styles.updateProfileButton} onPress={submitUpdateProfile}>
                                                <Text style={styles.submitButtonText}>Submit changes</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </KeyboardAvoidingView>
                            </Modal>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}