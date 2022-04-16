import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setSavedPosts(data){
    try {
        let jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('saved-posts', jsonValue)
    }catch{
        alert("Error")
    }
}