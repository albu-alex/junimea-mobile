import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUserDetails(){
    let profilePicture
    let username
    let userID
    const userDetails = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem('profilePicture')
            profilePicture = JSON.parse(jsonValue) !== null ? JSON.parse(jsonValue) : null
            jsonValue = await AsyncStorage.getItem('username')
            username = JSON.parse(jsonValue) !== null ? JSON.parse(jsonValue) : null
            jsonValue = await AsyncStorage.getItem('userID')
            userID = JSON.parse(jsonValue) !== null ? JSON.parse(jsonValue) : null
        }catch{
            alert("Error while reading local storage")
        }
    }
    await userDetails()
    return[profilePicture, username, userID]
}