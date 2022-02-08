//npm import
import { Text, View, TouchableOpacity, Image, TextInput, ScrollView,
    Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                <ScrollView pinchGestureEnabled={true} maximumZoomScale={3} minimumZoomScale={0.5}
                            showsVerticalScrollIndicator={false}
                            showHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => null} activeOpacity={1}>
                        <Image source={{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}}
                               style={{width: 300, height: 300, marginBottom: 10}} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.feedback}>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='thumbs-up' size={24} color={'#555555'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='thumbs-down' size={24} color={'#555555'} />
                </TouchableOpacity>
                <Text style={styles.likeCount}>0</Text>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='comment' size={24} color={'#555555'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null}>
                    <Icon style={styles.logo} name='share' size={24} color={'#555555'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}