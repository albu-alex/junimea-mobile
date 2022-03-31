//npm import
import { View, KeyboardAvoidingView, FlatList, Platform,
    TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from "react-native-appearance";
import { FAB } from 'react-native-elements';

//css stylesheet import
import { styles } from "../styles/MainPageStyles";

//custom methods import
import { getInitialPosts } from "../methods/MainPage/getInitialPosts"

//custom components import
import UserPost from "./UserPost"

export default function MainPage({_}){
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [postNumber, setPostNumber] = useState(100);
    const renderItem = ({ item }) => (
        <View key={item.id.toString()}>
            <UserPost key={item.id.toString()} id={item.id} />
        </View>
    );
    const fetchPosts = async () => {
        const fetchedData = await getInitialPosts(postNumber)
        setPostNumber(postNumber + 10)
        setData(fetchedData)
    }
    const loadPosts = async () => {
        const fetchedData = await getInitialPosts(postNumber)
        setPostNumber(postNumber + 10)
        const newData = data.concat(fetchedData)
        setData(newData)
    }
    useEffect(async () => {
        await fetchPosts()
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
                        color={(scheme === 'dark') ? '#555555' : '#AAAAAA'}/>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}