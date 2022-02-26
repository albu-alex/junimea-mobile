//npm import
import { Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom method import
import setupUpdateProfileModal from "../methods/Settings/setupUpdateProfileModal";

//css stylesheet import
import { styles } from "../styles/SettingsStyles";

export default function Settings({navigation}){
    const [showModal, setShowModal] = useState(false)
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
                            setupUpdateProfileModal()
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}