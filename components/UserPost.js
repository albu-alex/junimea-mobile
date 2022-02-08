//npm import
import { Text, View, TouchableOpacity, Image, TextInput,
    Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react'

//css stylesheet import
import { styles } from "../styles/UserPostStyles";

export default function UserPost(){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => null} activeOpacity={0.6}>
                <View style={styles.postHeader}>
                    <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                           style={{width: 25, height: 25, borderRadius: 50}} />
                    <Text style={styles.headerText}>test user</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}