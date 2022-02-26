//npm import
import { Text, View, KeyboardAvoidingView, TouchableOpacity, FlatList, StyleSheet,
    TextInput, Modal, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';

export default function setupUpdateProfileModal(){
    return(
        <Modal animationType={'slide'} transparent={false}>
            <View style={{display: 'flex',flex: 1, justifyContent: 'center'}}>
                <Text style={{alignSelf: 'center'}}>Modal setup complete!</Text>
            </View>
        </Modal>
    )
}