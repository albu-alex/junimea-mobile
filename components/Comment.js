//npm import
import { Text, View, TouchableOpacity, Image, TextInput,
    ActivityIndicator, Animated, Dimensions, Modal } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

//css stylesheet import
import { styles } from "../styles/CommentStyles";

export default function Comment(props){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                {!props.commentDetails.user.profilePicUrl && props.commentDetails.user.profilePicUrl !== null &&
                    <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                           style={{width: 20, height: 20, borderRadius: 50}} />
                }
                {props.commentDetails.user.profilePicUrl &&
                    <Image source={{uri: props.commentDetails.user.profilePicUrl}}
                           style={{width: 20, height: 20, borderRadius: 50}} />
                }
                <Text style={styles.headerText}>{props.commentDetails.user.firstName}</Text>
                <TouchableOpacity style={{marginLeft: '60%'}} onPress={() => null}>
                    <Icon name='ellipsis-h' size={16} color={'#555555'}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.primaryText}>{props.commentDetails.text}</Text>
        </View>
    )
}