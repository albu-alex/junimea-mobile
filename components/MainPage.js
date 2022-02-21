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
import { setPosts } from "../methods/MainPage/setPosts"

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
    const [postNumber, setPostNumber] = useState(200);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        let newPosts
        sleep(1).then(async () => {
            const newData = await getInitialPosts(postNumber)
            newPosts = newData.concat(data)
            setData(newPosts)
            setRefreshing(false)
        });
        setPostNumber(postNumber + 10)
    }, []);
    const renderItem = ({ item }) => (
        <View key={item.id.toString()}>
            <UserPost id={item.id} />
        </View>
    );
    useEffect(async () => {
        const [newProfilePicture, newUsermane, newUserID] = await getSelf();
        setProfilePicture(newProfilePicture)
        setUsername(newUsermane)
        setUserID(newUserID)

        const initialData = await getInitialPosts(postNumber)
        setPostNumber(postNumber + 10)
        setData(initialData)
        // alert(data.length)
    }, []);
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
                            keyExtractor={(item, index) => {
                                console.log(item.id.toString())
                                return item.id.toString()
                            }}
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