//npm import
import {
    Text, View, TouchableOpacity, Image, TextInput,
    ActivityIndicator, Animated, Dimensions, Modal, Alert
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import { useColorScheme } from "react-native-appearance";

//css stylesheet import
import { styles } from "../styles/UserPostStyles";

//custom component import
import Comment from "../components/Comment"

//custom methods import
import { reportBug } from "../methods/UserPost/reportBug";
import { loadPost } from "../methods/UserPost/loadPost";
import { likePost } from "../methods/UserPost/likePost";
import { dislikePost } from "../methods/UserPost/dislikePost";
import { createNewComment } from "../methods/UserPost/createNewComment";
import { postPhoto } from "../methods/UserPost/postPhoto";

export default function UserPost(props){
    const [showComments, setshowComments] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [postHidden, setPostHidden] = useState(false);
    const [postDetails, setPostDetails] = useState({});
    const [commentText, setCommentText] = useState('');
    const [photos, setPhotos] = useState([]);
    const togglePost = async () => {
        let toggle = await reportBug(postHidden);
        // minor bug here
        // alert(toggle)
        await setPostHidden(toggle);
    }
    const setLikes = async (isLike) => {
        if (isLike)
            await likePost(props.id)
        else
            await dislikePost(props.id)
        resetPostDetails()
    }
    const addComment = async () => {
        let result = await createNewComment(commentText, props.id, photos)
        setCommentText("")
        setPhotos([])
        resetPostDetails()
    }
    const resetPostDetails = async () => {
        let details = await loadPost(props.id)
        setPostDetails(details)
    }
    const addPhoto = async () => {
        let photo = await postPhoto()
        let newPhotos = photos
        newPhotos.push(photo)
        setPhotos(newPhotos)
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
        let details = await loadPost(props.id);
        setPostDetails(details);
    }, []);
    const scheme = useColorScheme()
    return(
        <View style={[styles.container,
            scheme === "dark"
                ? { backgroundColor: "#151515" }
                : { backgroundColor: '#EAEAEA'} ]}>
            <TouchableOpacity onPress={() => null} activeOpacity={0.6}>
                <View style={styles.postHeader}>
                    {!postDetails.profilePicUrl && postDetails.profilePicUrl !== null &&
                        <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                        style={{width: 25, height: 25, borderRadius: 50}} />
                    }
                    {postDetails.profilePicUrl &&
                        <Image source={{uri: postDetails.profilePicUrl}}
                               style={{width: 25, height: 25, borderRadius: 50}} />
                    }
                    <Text style={[styles.headerText,
                        scheme === "dark"
                            ? { color: '#AAAAAA' }
                            : { color: '#555555'}]}>{postDetails.userName}</Text>
                </View>
            </TouchableOpacity>
            <View>
                <View style={styles.contentHeader}>
                    <Text style={[styles.primaryText,
                        scheme === "dark"
                            ? { color: '#AAAAAA' }
                            : { color: '#555555'}]}>{postDetails.title}</Text>
                    <TouchableOpacity style={{marginRight: '2%'}} onPress={togglePost}>
                        {scheme === 'dark' &&
                            <Icon name='ellipsis-h' size={20} color={'#AAAAAA'}/>
                        }
                        {scheme === 'light' &&
                            <Icon name='ellipsis-h' size={20} color={'#555555'}/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.tags}>
                    {postDetails.tags &&postDetails.tags.map((object, i) =>
                        <TouchableOpacity style={[styles.tagBackground,
                                                scheme === 'dark'
                                                ? { backgroundColor: '#AAAAAA', borderColor: '#151515' }
                                                : { backgroundColor: '#555555', borderColor: '#EAEAEA' }]} activeOpacity={0.6}>
                                <Text style={[styles.tag,
                                            scheme === 'dark'
                                            ? { color: "#151515" }
                                            : { color: "#EAEAEA"}]}>{object}</Text>
                        </TouchableOpacity>
                        )
                    }
                </View>
                {!postDetails.files && scheme === 'dark' &&
                    <ActivityIndicator size='large' color='ghostwhite' />
                }
                {!postDetails.files && scheme === 'light' &&
                    <ActivityIndicator size='large' color='#070700' />
                }
                {postDetails.files && !showModal && postDetails.files.map((object, i) =>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => setShowModal(true)}>
                        <Image source={{uri: object}}
                               style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').width/300)*300}}/>
                    </TouchableOpacity>
                )}
                {postDetails.files && showModal && postDetails.files.map((object, i) =>
                    <Modal animationType={'slide'} onRequestClose={() => setShowModal(false)} transparent={false}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                        <PanGestureHandler onGestureEvent={handlePan}>
                        <Animated.View style={styles.modal}>
                            <PinchGestureHandler onGestureEvent={handlePinch}>
                                <Animated.Image source={{uri: object}}
                                                style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').width/300)*300,
                                                marginBottom: 10, transform: [{scale}, {translateX}]}} />
                            </PinchGestureHandler>
                        </Animated.View>
                        </PanGestureHandler>
                    </Modal>
                )}
            </View>
            <View style={styles.feedback}>
                <TouchableOpacity onPress={() => setLikes(true)}>
                    {scheme === 'dark' &&
                        <Icon name='thumbs-up' size={24} color={'#AAAAAA'}/>
                    }
                    {scheme === 'light' &&
                        <Icon name='thumbs-up' size={24} color={'#555555'}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLikes(false)}>
                    {scheme === 'dark' &&
                        < Icon name='thumbs-down' size={24} color={'#AAAAAA'} />
                    }
                    {scheme === 'light' &&
                        < Icon name='thumbs-down' size={24} color={'#555555'} />
                    }
                </TouchableOpacity>
                <Text style={[styles.likeCount,
                            scheme === 'dark'
                            ? {color: "#AAAAAA"}
                            : {color: "#555555"}]}>{postDetails.likes}</Text>
                <TouchableOpacity onPress={() => setshowComments(!showComments)}>
                    {scheme === 'dark' &&
                        <Icon name='comment' size={24} color={'#AAAAAA'}/>
                    }
                    {scheme === 'light' &&
                        <Icon name='comment' size={24} color={'#555555'}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null}>
                    {scheme === 'dark' &&
                        <Icon name='share' size={24} color={'#AAAAAA'}/>
                    }
                    {scheme === 'light' &&
                        <Icon name='share' size={24} color={'#555555'}/>
                    }
                </TouchableOpacity>
            </View>
            {showComments &&
                <View style={[styles.commentSection,
                            scheme === 'dark'
                            ? { borderTopColor: "ghostwhite" }
                            : { borderTopColor: "#070700" }]}>
                    {!postDetails.comments && scheme === 'dark' &&
                        <ActivityIndicator size='large' color='ghostwhite' />
                    }
                    {!postDetails.comments && scheme === 'light' &&
                        <ActivityIndicator size='large' color='#070700' />
                    }
                    {postDetails.comments.length === 0 &&
                        <View style={styles.noComment}>
                            {scheme === 'dark' &&
                                <Icon style={{alignSelf: 'center'}} name='hand-stop-o' size={40} color={"ghostwhite"}/>
                            }
                            {scheme === 'light' &&
                                <Icon style={{alignSelf: 'center'}} name='hand-stop-o' size={40} color={"#070700"}/>
                            }
                            <Text style={[styles.headerText,
                                    scheme === "dark"
                                    ? { color: '#AAAAAA' }
                                    : { color: '#555555'}]}>Be the first to comment on this post</Text>
                        </View>
                    }
                    {postDetails.comments && postDetails.comments.map((object, i) =>
                        <Comment commentDetails={object} />
                    )}
                    <View style={[styles.addNewComment,
                                scheme === 'dark'
                                ? { borderTopColor: "ghostwhite" }
                                : { borderTopColor: "#070700"}]}>
                        {scheme === 'dark' &&
                            <Icon name='comment' size={14} color={"#555555"} style={styles.inputIcon}/>
                        }
                        {scheme === 'light' &&
                            <Icon name='comment' size={14} color={"#AAAAAA"} style={styles.inputIcon}/>
                        }
                        {scheme === 'dark' &&
                            <TextInput style={[styles.textInput, { backgroundColor: '#252525', color: "ghostwhite" }]}
                                       placeholderTextColor={"ghostwhite"}
                                       multiline={true} placeholder={'Add new comment...'}
                                       onChangeText={newCommentText => setCommentText(newCommentText)}
                                       defaultValue={commentText}/>
                        }
                        {scheme === 'light' &&
                            <TextInput style={[styles.textInput, { backgroundColor: '#DADADA', color: "#070700" }]}
                                       placeholderTextColor={"#070700"}
                                       multiline={true} placeholder={'Add new comment...'}
                                       onChangeText={newCommentText => setCommentText(newCommentText)}
                                       defaultValue={commentText}/>
                        }
                        {scheme === 'dark' &&
                            <TouchableOpacity onPress={() => addPhoto()} style={styles.addNewCommentButton}>
                                <Icon name='image' size={18} color={"#AAAAAA"}/>
                            </TouchableOpacity>
                        }
                        {scheme === 'light' &&
                            <TouchableOpacity onPress={() => addPhoto()} style={styles.addNewCommentButton}>
                                <Icon name='image' size={18} color={"#555555"}/>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={() => addComment()} style={styles.addNewCommentButton}>
                            <Text style={scheme === 'dark' ? {color: "ghostwhite"} : {color: "#070700"}}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}