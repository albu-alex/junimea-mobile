//npm import
import { Text, View, TouchableOpacity, ScrollView,
    TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//custom method import
import { getScheme } from "../methods/App/getScheme";
import { search } from "../methods/Search/search";

//css stylesheet import
import { styles } from "../styles/SearchStyles";


export default function Search({ navigation }){
    const [searchText, setSearchText] = useState("");
    const [scheme, setScheme] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
    const [inputBackgroundColor, setInputBackgroundColor] = useState("")
    const [textColor, setTextColor] = useState("")
    const [iconColor, setIconColor] = useState("")
    const [tags, setTags] = useState([])
    const beginSearch = ({ nativeEvent: { key: keyValue } }) => {
        if(keyValue === 'Enter') {
            const newTags = search(tags, searchText)
            setTags(newTags)
            setSearchText("")
        }
    }
    useEffect(() => {
        const mockUpTags = []
        mockUpTags.push("Steaua")
        mockUpTags.push("Rapid")
        mockUpTags.push("Dinamo")
        mockUpTags.push("CFR Cluj")
        setTags(mockUpTags)
    }, []);
    useEffect(async () => {
        setScheme(await getScheme())
        const newBackgroundColor = (scheme === 'dark') ? '#252525' : '#DADADA'
        setBackgroundColor(newBackgroundColor)
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
                            {backgroundColor: inputBackgroundColor, color: iconColor}]} onKeyPress={beginSearch} />
                        <TouchableOpacity style={{borderRadius: 10}} onPress={() => navigation.navigate("MainPage")}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.primaryText,
                        {color: textColor}]}>Trending</Text>
                    <ScrollView>
                        {tags.map((object, i) =>
                            <TouchableOpacity onPress={() => null}>
                                <Text style={[styles.tags,
                                    {color: textColor}]}>{object}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}