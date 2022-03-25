//npm import
import { Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList, Modal,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom method import
import { updateProfile } from "../methods/Settings/updateProfile"
import {getUserDetails} from "../methods/UserProfile/getUserDetails"
import {getScheme} from "../methods/App/getScheme";

//css stylesheet import
import { styles } from "../styles/SettingsStyles";

export default function Settings({navigation}){
    const [showModal, setShowModal] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [userID, setUserID] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
    const [buttonBackgroundColor, setButtonBackgroundColor] = useState("")
    const [buttonTextColor, setButtonTextColor] = useState("")
    const submitUpdateProfile = async () => {
        await updateProfile(firstName, lastName, email)
        setShowModal(false)
    }
    useEffect(async () => {
        const [_, __, newUserID] = await getUserDetails();
        setUserID(newUserID)
        const scheme = await getScheme()
        setBackgroundColor((scheme === 'dark') ? '#252525' : '#DADADA')
        setButtonBackgroundColor((scheme === 'dark') ? '#070700' : "ghostwhite")
        setButtonTextColor((scheme === "dark") ? '#AAAAAA' : '#555555')
    });
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.inner,
                            {backgroundColor: backgroundColor}]}>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.button,
                            {backgroundColor: buttonBackgroundColor}]} onPress={() => navigation.navigate("Login")}>
                            <Icon style={styles.icon} name='sign-out' size={24} color={buttonTextColor}></Icon>
                            <Text style={[styles.buttonText,
                                {color: buttonTextColor}]}>{userID === '' ? "Login" : "Logout"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,
                            {backgroundColor: buttonBackgroundColor}]} onPress={() => alert("change theme")}>
                            <Icon style={styles.icon} name='moon-o' size={24} color={buttonTextColor}></Icon>
                            <Text style={[styles.buttonText,
                                {color: buttonTextColor}]}>Dark mode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,
                            {backgroundColor: buttonBackgroundColor}]} onPress={() => setShowModal(true)}>
                            <Icon style={styles.icon} name='user' size={24} color={buttonTextColor}></Icon>
                            <Text style={[styles.buttonText,
                                {color: buttonTextColor}]}>Update profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,
                            {backgroundColor: buttonBackgroundColor}]} onPress={() => navigation.navigate("MainPage")}>
                            <Icon style={styles.icon} name='close' size={24} color={buttonTextColor}></Icon>
                            <Text style={[styles.buttonText,
                                {color: buttonTextColor}]}>Close settings</Text>
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
                                                    <TextInput onChangeText={newFirstName => setFirstName(newFirstName)} defaultValue={firstName}
                                                        style={styles.textInput} placeholderTextColor={"#070700"} placeholder={'First Name'} />
                                                </View>
                                            </View>
                                            <View style={styles.inputsContainer}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Icon name="id-card-o" size={16} color={"#070700"} style={styles.modalIcon} />
                                                    <TextInput onChangeText={newLastName => setLastName(newLastName)} defaultValue={lastName}
                                                        style={styles.textInput} placeholderTextColor={"#070700"} placeholder={'Last Name'} />
                                                </View>
                                            </View>
                                            <View style={styles.inputsContainer}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Icon name="envelope" size={16} color={"#070700"} style={styles.modalIcon} />
                                                    <TextInput onChangeText={newEmail => setEmail(newEmail)} defaultValue={email}
                                                        style={styles.textInput} placeholderTextColor={"#070700"} placeholder={'Email'} />
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