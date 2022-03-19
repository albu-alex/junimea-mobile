import React from "react";
import FormData from 'form-data'
import axios from 'axios'
import { Alert } from 'react-native'

export async function uploadProfilePicture(profilePicture) {
    let data = new FormData();
    console.log(profilePicture.localUri)
    data.append('Pic', {
        uri: profilePicture.localUri,
        name: profilePicture.filename,
        type: 'image/jpeg'
    });
    let newProfilePic;
    await axios.post('http://52.57.118.176/User/ProfilePic', data, {
        timeout: 4000,
        header: {
            "Content-Type": "multipart/form-data"
        }
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