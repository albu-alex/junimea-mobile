//npm import
import { Text, View, TouchableOpacity, Image, TextInput,
    ActivityIndicator, Animated, Dimensions, Modal } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom method import
import { likeComment } from "../methods/Comment/likeComment"
import { getScheme } from "../methods/App/getScheme"

//css stylesheet import
import { styles } from "../styles/CommentStyles"

export default function Comment(props){
    const [isReply, setIsReply] = useState(false)
    const [scheme, setScheme] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
    const [textColor, setTextColor] = useState("")

    useEffect(async () => {
        setScheme(await getScheme())
        setBackgroundColor((scheme === 'dark') ? '#151515' : '#EAEAEA')
        setTextColor((scheme === 'dark') ? '#AAAAAA' : '#555555')
    })
    return(
        <View style={[styles.container,
            {backgroundColor: backgroundColor}]}>
            <View style={styles.header}>
                <View style={{justifyContent: 'flex-start', display: 'flex', flexDirection: 'row'}}>
                    {!props.commentDetails.user.profilePicUrl && props.commentDetails.user.profilePicUrl !== null &&
                        <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                               style={{width: 20, height: 20, borderRadius: 50}} />
                    }
                    {props.commentDetails.user.profilePicUrl &&
                        <Image source={{uri: props.commentDetails.user.profilePicUrl}}
                               style={{width: 20, height: 20, borderRadius: 50}} />
                    }
                    <Text style={[styles.headerText,
                        {color: textColor}]}>{props.commentDetails.user.firstName}</Text>
                </View>
                <TouchableOpacity onPress={() => null}>
                    <Icon name='ellipsis-h' size={16} color={textColor}/>
                </TouchableOpacity>
            </View>
            <Text style={[styles.primaryText,
                {color: textColor}]}>{props.commentDetails.text}</Text>
            <View>
                {props.commentDetails.files.map((object, i) =>
                    <Image source={{uri: object}}
                                 style={{width: Dimensions.get('window').width*0.8,
                                     height: (Dimensions.get('window').width*0.8/300)*300}} />
                )}
            </View>
            <View style={styles.commentInteraction}>
                <TouchableOpacity activeOpacity={0.4} onPress={likeComment}>
                    <Text style={[styles.secondaryText,
                        {color: textColor}]}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.4} onPress={() => setIsReply(!isReply)}>
                    <Text style={[styles.secondaryText,
                        {color: textColor}]}>Reply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}