import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getPosts(){
    try {
        let jsonValue = await AsyncStorage.getItem('posts')
        posts = JSON.parse(jsonValue) !== null ? JSON.parse(jsonValue) : null
        return posts
    }
    catch{
        alert("Error")
    }
}