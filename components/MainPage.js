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

export default function MainPage({ navigation }){
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [userID, setUserID] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [postNumber, setPostNumber] = useState(100);
    const renderItem = ({ item }) => (
        <UserPost key={item.id.toString()} id={item.id} />
    );
    const fetchPosts = async () => {
        const initialData = await getInitialPosts(postNumber)
        setPostNumber(postNumber + 10)
        const newData = initialData.concat(data)
        setData(initialData)
    }
    useEffect(async () => {
        const [newProfilePicture, newUsermane, newUserID] = await getSelf();
        setProfilePicture(newProfilePicture)
        setUsername(newUsermane)
        setUserID(newUserID)

        await fetchPosts()
    }, []);
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {data !== [] && data.length % 10 === 0 &&
                        <FlatList
                            windowSize={20}
                            removeClippedSubviews={true}
                            data={data}
                            renderItem={renderItem}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={fetchPosts}
                                />
                            }
                        />
                    }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}