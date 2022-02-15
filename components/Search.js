//npm import
import { Text, View, TouchableOpacity, ScrollView,
    TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

//css stylesheet import
import { styles } from "../styles/SearchStyles";


export default function Search({ navigation }){
    const [searchText, setSearchText] = useState("");
    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={styles.header}>
                        <Icon style={styles.searchIcon} name='search' size={24} color={'#070700'}/>
                        <TextInput autoCorrect={false} placeholderTextColor={'#070700'} placeholder={'Search Junimea'}
                                   onChangeText={newSearchText => setSearchText(newSearchText)}
                                   defaultValue={searchText} style={styles.textInput} />
                        <TouchableOpacity style={{borderRadius: 10}} onPress={() => navigation.navigate("MainPage")}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.primaryText}>Trending</Text>
                    <ScrollView>
                        <TouchableOpacity onPress={() => null} activeOpacity={0.8}>
                            <Text style={styles.tags}>Steaua</Text>
                        </TouchableOpacity>
                        <Text style={styles.tags}>Dinamo</Text>
                        <Text style={styles.tags}>CFR Cluj</Text>
                        <Text style={styles.tags}>Astra</Text>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}