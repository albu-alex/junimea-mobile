//npm imports
import { Text, View, Image, TouchableOpacity, FlatList,
    TextInput, Platform, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//css stylesheet import
import {styles} from "../styles/UserProfileStyles"

//custom methods import
import { getUserDetails } from "../methods/UserProfile/getUserDetails"
import { getPosts } from "../methods/UserProfile/getPosts"
import { uploadProfilePicture } from "../methods/UserProfile/uploadProfilePicture"

//custom components import
import UserPost from "./UserPost"

export default function UserProfile({ navigation }){
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [userID, setUserID] = useState('');
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [postNumber, setPostNumber] = useState(200)
    useEffect(async () => {
        const [newProfilePicture, newUsermane, newUserID] = await getUserDetails();
        setProfilePicture(newProfilePicture)
        setUsername(newUsermane)
        setUserID(newUserID)

        await fetchPosts()
    });
    const fetchPosts = async() => {
        let posts = await getPosts()
        setData(posts)
    }
    const renderItem = ({ item }) => (
        (userID === item.userId) ?
            <UserPost key={item.id} id={item.id} />
            : null
    );
    return(
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("MainPage")}>
                    <Icon name='arrow-left' size={30} color={"#505050"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("report user")}>
                    <Icon name='ellipsis-h' size={30} color={'#505050'} />
                </TouchableOpacity>
            </View>
            <View>
                {profilePicture === '' &&
                    <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                           style={styles.profilePicture} />
                }
                {profilePicture !== '' &&
                    <Image source={{uri: profilePicture}}
                           style={styles.profilePicture} />
                }
                {username === '' &&
                    <Text style={styles.primaryText}>Guest</Text>
                }
                {username !== '' &&
                    <Text style={styles.primaryText}>{username}</Text>
                }
            </View>
            <View style={{flexDirection: 'row', borderBottomWidth: 0.6, borderBottomColor: '#070700'}}>
                <TouchableOpacity onPress={uploadProfilePicture} style={styles.profileButton}>
                    <Text style={styles.buttonText}>Change picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton} onPress={() => alert("View saved posts")}>
                    <Text style={styles.buttonText}>View saved posts</Text>
                </TouchableOpacity>
            </View>
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
        </View>
    )
}