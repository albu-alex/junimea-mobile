import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setHiddenPosts(data){
    try {
        let jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('hidden-posts', jsonValue)
    }catch{
        alert("Error")
    }
}