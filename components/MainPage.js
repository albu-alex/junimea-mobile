//npm import
import { Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';

//css stylesheet import
import { styles } from "../styles/MainPageStyles";

//custom methods import
import { getSelf } from "../methods/MainPage/getSelf";
import { getInitialPosts } from "../methods/MainPage/getInitialPosts"

//custom components import
import UserPost from "./UserPost"

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function MainPage({ navigation }){
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [userID, setUserID] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        sleep(500).then(() => setRefreshing(false));
    }, []);
    const renderItem = ({ item }) => (
        <UserPost />
    );
    useEffect(async () => {
        const [newProfilePicture, newUsermane, newUserID] = await getSelf();
        setProfilePicture(newProfilePicture)
        setUsername(newUsermane)
        setUserID(newUserID)
        //200 magic number to be changed
        const initialData = await getInitialPosts(200)
        setData(initialData)
    });
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {data !== [] &&
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}