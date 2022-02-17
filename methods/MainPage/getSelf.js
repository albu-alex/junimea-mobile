import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getSelf(){
    let profilePicture;
    let username;
    let userID;
    await axios({
        method: 'get',
        url: `http://52.57.118.176/User/Self`,
        timeout: 4000
    })
    .then(function (response){
        if(response.status === 200){
            profilePicture = response.data.profilePicUrl
            username = response.data.email
            userID = response.data.id
        }
    })
    .catch(function(){
        profilePicture = "";
        username = "";
        userID = "";
    });
    const userDetails = async () => {
        try{
            let jsonValue = JSON.stringify(profilePicture)
            await AsyncStorage.setItem('profilePicture', jsonValue)
            jsonValue = JSON.stringify(username)
            await AsyncStorage.setItem('username', jsonValue)
            jsonValue = JSON.stringify(userID)
            await AsyncStorage.setItem('userID', jsonValue)
        } catch{
            alert("There was an error storing the values!")
        }
    }
    await userDetails()
    return [profilePicture, username, userID];
}