//npm imports
import { Text, View, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//css stylesheet import
import { styles } from "../styles/UserProfileStyles"

//custom methods import
import { getUserDetails } from "../methods/UserProfile/getUserDetails"
import { getPosts } from "../methods/UserProfile/getPosts"
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
    const [backgroundColor, setBackgroundColor] = useState("")
    const [iconColor, setIconColor] = useState("")
    const [textColor, setTextColor] = useState("")
    const [buttonTextColor, setButtonTextColor] = useState("")
    const [scheme, setScheme] = useState("")

    useEffect(async () => {
        const newScheme = await getScheme()
        setScheme(newScheme)

        const [newProfilePicture, newUsername, newUserID] = await getUserDetails();
        setProfilePicture(newProfilePicture)
        setUsername(newUsername)
        setUserID(newUserID)

        setBackgroundColor((scheme === 'dark') ? '#252525' : '#DADADA')
        setIconColor((scheme === 'dark') ? '#AFAFAF': '#505050')
        setTextColor((scheme === 'dark') ? '#AAAAAA' : '#555555')
        setButtonTextColor((scheme === 'dark') ? 'ghostwhite' : '#070700')
    })

    useEffect(async () => {
        await fetchPosts()
    }, [])

    const changeProfilePicture = async() => {
        await uploadFile()
    }

    const fetchPosts = async () => {
        setRefreshing(true)
        let posts = await getPosts()
        setData(posts)
        setRefreshing(false)
    }

    const renderItem = ({ item }) => (
        (userID === item.userId) ?
            <UserPost key={item.id} id={item.id} />
            : null
    )
    return(
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <StatusBar style={(scheme === 'dark') ? 'light' : 'dark'} />
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
                    <Text style={[styles.primaryText,
                        {color: textColor}]}>Guest</Text>
                }
                {username !== '' &&
                    <Text style={[styles.primaryText,
                        {color: textColor}]}>{username}</Text>
                }
            </View>
            <View style={{flexDirection: 'row', borderBottomWidth: 0.6, borderBottomColor: buttonTextColor}}>
                <TouchableOpacity onPress={changeProfilePicture} style={[styles.profileButton,
                                                                        {backgroundColor: iconColor}]}>
                    <Text style={[styles.buttonText,
                        {color: buttonTextColor}]}>Change picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.profileButton,
                    {backgroundColor: iconColor}]} onPress={() => alert("View saved posts")}>
                    <Text style={[styles.buttonText,
                        {color: buttonTextColor}]}>View saved posts</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                windowSize={60}
                initialNumToRender={10}
                removeClippedSubviews={true}
                data={data}
                extraData={this.state}
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