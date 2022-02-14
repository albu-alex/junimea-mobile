//npm import
import { Text, View, TouchableOpacity, Image, TextInput, ScrollView,
    Platform, TouchableWithoutFeedback, Keyboard, Animated, Dimensions } from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';

//css stylesheet import
import { styles } from "../styles/UserPostStyles";

export default function UserPost(){
    const [showComments, setshowComments] = useState(false);
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
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => null} activeOpacity={0.6}>
                <View style={styles.postHeader}>
                    <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                           style={{width: 25, height: 25, borderRadius: 50}} />
                    <Text style={styles.headerText}>test user</Text>
                </View>
            </TouchableOpacity>
            <View>
                <View style={styles.contentHeader}>
                    <Text style={styles.primaryText}>ALE ALE ALE OOOO GALERIA DINAMO</Text>
                    <TouchableOpacity style={{marginRight: '2%'}} onPress={() => null}>
                        <Icon name='ellipsis-h' size={20} color={'#555555'}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.tags}>
                    <TouchableOpacity activeOpacity={0.6}>
                        <Text>tag</Text>
                    </TouchableOpacity>
                </View>
                <PanGestureHandler onGestureEvent={handlePan}>
                <Animated.View>
                    <PinchGestureHandler onGestureEvent={handlePinch}>
                            <Animated.Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                                   style={{width: Dimensions.get('window').width, height: (Dimensions.get('window').width/300)*300,
                                       marginBottom: 10, transform: [{scale}, {translateX}]}} />
                    </PinchGestureHandler>
                </Animated.View>
                </PanGestureHandler>
            </View>
            <View style={styles.feedback}>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='thumbs-up' size={24} color={'#555555'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='thumbs-down' size={24} color={'#555555'} />
                </TouchableOpacity>
                <Text style={styles.likeCount}>0</Text>
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
                        <Icon name='comment' size={14} color={"#AAAAAA"} style={styles.inputIcon}></Icon>
                        <TextInput style={styles.textInput} placeholderTextColor={"#AAAAAA"}
                                   multiline={true} placeholder={'Add new comment...'}></TextInput>
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