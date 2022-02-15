//npm import
import { Text, View, TouchableOpacity, Image, TextInput,
    ActivityIndicator, Animated, Dimensions } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';

//css stylesheet import
import { styles } from "../styles/UserPostStyles";

//custom methods import
import { reportBug } from "../methods/UserPost/reportBug";
import { loadPost } from "../methods/UserPost/loadPost";

export default function UserPost(){
    const [showComments, setshowComments] = useState(false);
    const [postHidden, setPostHidden] = useState(false);
    const [postDetails, setPostDetails] = useState({});
    const togglePost = async () => {
        let toggle = await reportBug(postHidden);
        // minor bug here
        // alert(toggle)
        await setPostHidden(toggle);
    }
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const handlePinch = Animated.event([{nativeEvent: {scale}}], {useNativeDriver: true});
    const handlePan = Animated.event([
        {
            nativeEvent: {
                translationX: translateX
            }
        }
    ],
        {
            useNativeDriver: true
        }
    )
    useEffect(async () => {
        let details = await loadPost(1539);
        setPostDetails(details);
    });
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => null} activeOpacity={0.6}>
                <View style={styles.postHeader}>
                    {!postDetails.profilePicUrl &&
                        <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                        style={{width: 25, height: 25, borderRadius: 50}} />
                    }
                    {postDetails.profilePicUrl &&
                        <Image source={{uri: postDetails.profilePicUrl}}
                               style={{width: 25, height: 25, borderRadius: 50}} />
                    }
                    <Text style={styles.headerText}>{postDetails.userName}</Text>
                </View>
            </TouchableOpacity>
            <View>
                <View style={styles.contentHeader}>
                    <Text style={styles.primaryText}>{postDetails.title}</Text>
                    <TouchableOpacity style={{marginRight: '2%'}} onPress={togglePost}>
                        <Icon name='ellipsis-h' size={20} color={'#555555'}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.tags}>
                    {postDetails.tags &&postDetails.tags.map((object, i) =>
                        <TouchableOpacity style={styles.tagBackground} activeOpacity={0.6}>
                                <Text style={styles.tag}>{object}</Text>
                        </TouchableOpacity>
                        )
                    }
                </View>
                {!postDetails.files &&
                    <ActivityIndicator size='large' color='#070700' />
                }
                {postDetails.files && postDetails.files.map((object, i) =>
                    <PanGestureHandler onGestureEvent={handlePan}>
                    <Animated.View>
                        <PinchGestureHandler onGestureEvent={handlePinch}>
                            <Animated.Image source={{uri: object}}
                                            style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').width/300)*300,
                                            marginBottom: 10, transform: [{scale}, {translateX}]}} />
                        </PinchGestureHandler>
                    </Animated.View>
                    </PanGestureHandler>
                )}
            </View>
            <View style={styles.feedback}>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='thumbs-up' size={24} color={'#555555'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='thumbs-down' size={24} color={'#555555'} />
                </TouchableOpacity>
                <Text style={styles.likeCount}>{postDetails.likes}</Text>
                <TouchableOpacity onPress={() => setshowComments(!showComments)}>
                    <Icon style={styles.logo} name='comment' size={24} color={'#555555'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='share' size={24} color={'#555555'} />
                </TouchableOpacity>
            </View>
            {showComments &&
                <View style={styles.commentSection}>
                    {/*this is where comments are supposed to show*/}
                    <Text>Comentariu</Text>
                    <View style={styles.addNewComment}>
                        <Icon name='comment' size={14} color={"#AAAAAA"} style={styles.inputIcon}/>
                        <TextInput style={styles.textInput} placeholderTextColor={"#AAAAAA"}
                                    multiline={true} placeholder={'Add new comment...'}/>
                        <TouchableOpacity onPress={() => null} style={styles.addNewCommentButton}>
                            <Icon name='image' size={18} color={"#555555"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => null} style={styles.addNewCommentButton}>
                            <Text>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}