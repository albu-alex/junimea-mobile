import { uploadFile } from "./uploadFile"
import FormData from 'form-data'
import axios from 'axios'
import { Alert } from 'react-native'

export async function uploadProfilePicture() {
    let profilePicture = await uploadFile()
    let data = new FormData();
    data.append('Pic', {uri: profilePicture.localUri, name: profilePicture.filename});
    let newProfilePic;
    await axios.post('http://52.57.118.176/User/ProfilePic', data, {
        timeout: 4000,
        headers: { "Content-Type": "multipart/form-data" }
    })
    .then(function (response){
        if(response.status === 200){
            newProfilePic = response.data.url
        }
    })
    .catch(function (error){
        if(error.response){
            Alert.alert("Error", String(Object.values(error.response.data.errors)[0]),
                [
                    {
                        text: "Try again",
                        style: "cancel",
                    }
                ],
                {
                    cancelable: true,
                }
            );
        }
    });
    if(newProfilePic){
        Alert.alert("Success", "Profile picture updated successfully!",
            [
                {
                    text: "Great",
                    style: "cancel",
                }
            ],
            {
                cancelable: true,
            }
        );
        return newProfilePic;
    }
}