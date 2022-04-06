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
import { uploadFile } from "../methods/UserProfile/uploadFile";
import { getScheme } from "../methods/App/getScheme";

//custom components import
import UserPost from "./UserPost"

export default function UserProfile({ navigation }){
    const [profilePicture, setProfilePicture] = useState('')
    const [username, setUsername] = useState('')
    const [userID, setUserID] = useState('')
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [postNumber, setPostNumber] = useState(200)
    const [backgroundColor, setBackgroundColor] = useState("")
    const [iconColor, setIconColor] = useState("")

    const scheme = getScheme()

    useEffect(async () => {
        const [newProfilePicture, newUsermane, newUserID] = await getUserDetails();
        setProfilePicture(newProfilePicture)
        setUsername(newUsermane)
        setUserID(newUserID)

        setBackgroundColor((scheme === 'dark') ? '#252525' : '#DADADA')
        setIconColor((scheme === 'dark') ? '#AFAFAF': '#505050')

        await fetchPosts()
    })

    const changeProfilePicture = async() => {
        await uploadFile()
    }

    const fetchPosts = async() => {
        let posts = await getPosts()
        setData(posts)
    }

    const renderItem = ({ item }) => (
        (userID === item.userId) ?
            <UserPost key={item.id} id={item.id} />
            : null
    )
    return(
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <StatusBar style='auto' />
            <View style={[styles.header, {backgroundColor: backgroundColor}]}>
                <TouchableOpacity onPress={() => navigation.navigate("MainPage")}>
                    <Icon name='arrow-left' size={30} color={iconColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("report user")}>
                    <Icon name='ellipsis-h' size={30} color={iconColor} />
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
                <TouchableOpacity onPress={changeProfilePicture} style={styles.profileButton}>
                    <Text style={styles.buttonText}>Change picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton} onPress={() => alert("View saved posts")}>
                    <Text style={styles.buttonText}>View saved posts</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                windowSize={60}
                initialNumToRender={10}
                removeClippedSubviews={true}
                data={data}
                extraData={this.state}
                renderItem={renderItem}
                onEndReachedThreshold={0.5}
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