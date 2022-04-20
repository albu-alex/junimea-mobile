import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getSavedPosts(){
    try {
        let jsonValue = await AsyncStorage.getItem('saved-posts')
        return JSON.parse(jsonValue) !== null ? JSON.parse(jsonValue) : null
    }
    catch{
        alert("Error")
    }
}