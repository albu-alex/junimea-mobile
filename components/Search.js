//npm import
import { Text, View, TouchableOpacity, ScrollView,
    TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom method import
import { getScheme } from "../methods/App/getScheme";

//css stylesheet import
import { styles } from "../styles/SearchStyles";


export default function Search({ navigation }){
    const [searchText, setSearchText] = useState("");
    const [scheme, setScheme] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
    const [inputBackgroundColor, setInputBackgroundColor] = useState("")
    const [textColor, setTextColor] = useState("")
    const [iconColor, setIconColor] = useState("")
    useEffect(async () => {
        setScheme(await getScheme())
        setBackgroundColor((scheme === 'dark') ? '#252525' : '#DADADA')
        setInputBackgroundColor((scheme === 'dark') ? '#AFAFAF' : '#505050')
        setTextColor((scheme === "dark") ? '#AAAAAA' : '#555555')
        setIconColor((scheme === 'dark') ? '#070700' : "ghostwhite")
    });
    return(
        <View style={[styles.container,
            {backgroundColor: backgroundColor}]}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.inner,
                    {backgroundColor: backgroundColor}]}>
                    <View style={styles.header}>
                        <Icon style={styles.searchIcon} name='search' size={24} color={iconColor}/>
                        <TextInput autoCorrect={false} placeholderTextColor={iconColor} placeholder={'Search Junimea'}
                                   onChangeText={newSearchText => setSearchText(newSearchText)} multiline={true}
                                   defaultValue={searchText} style={[styles.textInput,
                            {backgroundColor: inputBackgroundColor, color: iconColor}]} />
                        <TouchableOpacity style={{borderRadius: 10}} onPress={() => navigation.navigate("MainPage")}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.primaryText,
                        {color: textColor}]}>Trending</Text>
                    <ScrollView>
                        <TouchableOpacity onPress={() => null} activeOpacity={0.8}>
                            <Text style={[styles.tags,
                                {color: textColor}]}>Steaua</Text>
                        </TouchableOpacity>
                        <Text style={[styles.tags,
                            {color: textColor}]}>Dinamo</Text>
                        <Text style={[styles.tags,
                            {color: textColor}]}>CFR Cluj</Text>
                        <Text style={[styles.tags,
                            {color: textColor}]}>Astra</Text>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}