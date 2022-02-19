import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setPosts(data){
    try {
        let jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('posts', jsonValue)
    }catch{
        alert("Error")
    }
}