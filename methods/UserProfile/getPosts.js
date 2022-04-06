import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getPosts(){
    try {
        let jsonValue = await AsyncStorage.getItem('posts')
        return JSON.parse(jsonValue) !== null ? JSON.parse(jsonValue) : null
    }
    catch{
        alert("Error")
    }
}