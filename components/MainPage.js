//npm import
import {
    View, KeyboardAvoidingView, FlatList, Platform, Text,
    TouchableWithoutFeedback, Keyboard, RefreshControl, Modal, TouchableOpacity, TextInput
} from 'react-native';
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from "react-native-appearance";
import { FAB } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";

//css stylesheet import
import { styles } from "../styles/MainPageStyles";

//custom methods import
import { getInitialPosts } from "../methods/MainPage/getInitialPosts"
import { getSelf } from "../methods/MainPage/getSelf"
import { setPosts } from "../methods/MainPage/setPosts";

//custom components import
import UserPost from "./UserPost"

export default function MainPage({_}){
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [postNumber, setPostNumber] = useState(-1);
    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")
    const renderItem = ({ item }) => (
        <View key={item.id.toString()}>
            <UserPost key={item.id.toString()} id={item.id} />
        </View>
    );
    const fetchPosts = async () => {
        setRefreshing(true)
        const fetchedData = await getInitialPosts(postNumber)
        if(postNumber === -1) {
            setPostNumber(fetchedData[fetchedData.length - 1].id)
        }
        else {
            setPostNumber(postNumber - 10)
        }
        alert(postNumber)
        setData(fetchedData)
        await setPosts(fetchedData)
        setRefreshing(false)
    }
    const loadPosts = async () => {
        setRefreshing(true)
        const fetchedData = await getInitialPosts(postNumber)
        setPostNumber(postNumber - 10)
        const newData = data.concat(fetchedData)
        setData(newData)
        await setPosts(fetchedData)
        setRefreshing(false)
    }
    useEffect(async () => {
        await fetchPosts()
        await getSelf()
    }, []);
    const scheme = useColorScheme()
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.inner,
                    scheme === "dark"
                        ? { backgroundColor: "#252525" }
                        : { backgroundColor: '#DADADA' }]}>
                    {data !== [] && data.length % 10 === 0 &&
                        <FlatList
                            windowSize={60}
                            initialNumToRender={10}
                            removeClippedSubviews={true}
                            data={data}
                            extraData={this.state}
                            renderItem={renderItem}
                            onEndReachedThreshold={0.5}
                            onEndReached={loadPosts}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={fetchPosts}
                                />
                            }
                        />
                    }
                    <FAB placement='right' size='large'
                        icon={{name: 'add', color: (scheme === 'dark') ? 'white' : 'black'}}
                        color={(scheme === 'dark') ? '#555555' : '#AAAAAA'}
                        onPress={() => setShowModal(true)}/>
                    {showModal &&
                        <Modal animationType={'slide'} transparent={true}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={[styles.container,
                                    scheme === "dark"
                                        ? { backgroundColor: "#252525" }
                                        : { backgroundColor: '#DADADA' }]}>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <View style={[styles.inner,
                                        scheme === "dark"
                                            ? { backgroundColor: "#252525" }
                                            : { backgroundColor: '#DADADA' }]}>
                                        <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowModal(false)}>
                                            {scheme === 'dark' &&
                                                <Icon name="close" color="white" size={30}/>
                                            }
                                            {scheme !== 'dark' &&
                                                <Icon name="close" color="black" size={30}/>
                                            }
                                        </TouchableOpacity>
                                        <View style={styles.postForm}>
                                            <TextInput onChangeText={newTitle => setTitle(newTitle)} defaultValue={title}
                                            style={[styles.textInput,
                                            {backgroundColor: (scheme === 'dark') ? '#AFAFAF' : '#505050',
                                            color: (scheme === 'dark') ? 'ghostwhite' : '#070700'}]}
                                            placeholderTextColor={(scheme === 'dark') ? 'ghostwhite' : '#070700'}
                                            placeholder={'Enter the title of the post'} />
                                            <TextInput onChangeText={newTags => setTags(newTags)} defaultValue={tags}
                                            style={[styles.textInput,
                                            {backgroundColor: (scheme === 'dark') ? '#AFAFAF' : '#505050',
                                             color: (scheme === 'dark') ? 'ghostwhite' : '#070700'}]}
                                            placeholderTextColor={(scheme === 'dark') ? 'ghostwhite' : '#070700'}
                                            placeholder={'tag1, tag2, ...'} />
                                        </View>
                                        <Text>Mock text please ignore</Text>
                                        <View style={styles.submitButtons}>
                                            <TouchableOpacity style={[styles.button,
                                            {backgroundColor: (scheme === 'dark') ? '#AFAFAF' : '#505050'}]} onPress={() => null}>
                                                <Text>Create Post</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.button,
                                            {backgroundColor: (scheme === 'dark') ? '#AFAFAF' : '#505050'}]} onPress={() => null}>
                                                <Text>Add photo</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>
                        </Modal>
                    }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}